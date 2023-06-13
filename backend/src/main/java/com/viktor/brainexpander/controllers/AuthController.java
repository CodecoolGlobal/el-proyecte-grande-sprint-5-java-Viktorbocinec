package com.viktor.brainexpander.controllers;

import com.viktor.brainexpander.dto.TokenDto;
import com.viktor.brainexpander.dto.UserDataDto;
import com.viktor.brainexpander.exceptions.AuthenticationException;
import com.viktor.brainexpander.exceptions.UserAlreadyExistsError;
import com.viktor.brainexpander.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/authenticate")
    public TokenDto authenticate(Authentication authentication) {
        TokenDto tokenDto = authService.authenticate(authentication);
        System.out.println(tokenDto);
        if (tokenDto == null) throw new AuthenticationException("Authentication not provided!");
        return tokenDto;
    }


    @PostMapping("/register")
    public UserDataDto register(@RequestBody UserDataDto loginData) {
        UserDataDto userDataDto = authService.register(loginData);
        if (userDataDto == null) throw new UserAlreadyExistsError("User already exists!");
        return userDataDto;
    }


}
