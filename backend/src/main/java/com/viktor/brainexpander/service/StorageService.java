package com.viktor.brainexpander.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class StorageService {

    @Value("${storage.location}")
    private String storageLocation;

    public String storeFile(MultipartFile file) throws IOException {

        // Return null if the file is null or empty
        if (file == null || file.isEmpty()) {
            return null;
        }

        String originalFilename = file.getOriginalFilename();


        // Create the directory if it doesn't exist
        Path storageDirectory = Paths.get(storageLocation);
        if (!Files.exists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        // Resolve the file path
        Path filePath = storageDirectory.resolve(originalFilename);

        // Copy the file to the target location (Replacing existing file with the same name)
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return originalFilename;
    }
}
