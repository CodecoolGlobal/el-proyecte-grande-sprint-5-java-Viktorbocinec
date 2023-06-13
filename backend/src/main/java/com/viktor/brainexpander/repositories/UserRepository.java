package com.viktor.brainexpander.repositories;

import com.viktor.brainexpander.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUserByUsername(String username);
}
