package com.viktor.brainexpander.security;

import com.viktor.brainexpander.model.User;
import com.viktor.brainexpander.repositories.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserImplementationService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserImplementationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }




    public void createUser(User user){
        userRepository.save(user);
    }

    public boolean userExists(String username) {
        return userRepository.findUserByUsername(username) != null;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new UserImplementation(user);
    }
}
