package com.viktor.brainexpander.runner;

import com.viktor.brainexpander.model.User;
import com.viktor.brainexpander.repositories.UserRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class UserPopulator {

//    Die user wurden bereits in die Daten bank übertraggen deshalb brauche ich es nicht

//    @Bean
//    ApplicationRunner populateUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        return args -> {
//            User user = new User();
//            user.setUsername("user");
//            user.setPassword(passwordEncoder.encode("user"));
//            user.setAuthorities(Set.of("USER"));
//
//            userRepository.save(user);
//
//            User admin = new User();
//            admin.setUsername("admin");
//            admin.setPassword(passwordEncoder.encode("admin"));
//            admin.setAuthorities(Set.of("USER", "ADMIN"));
//
//            userRepository.save(admin);
//
//        };
//    }
}
