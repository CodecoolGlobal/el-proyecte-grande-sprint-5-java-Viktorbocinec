package com.viktor.brainexpander.dto;

import java.util.List;

public record UserDetailsDto(
        String username,
        List<String> authorities,
        boolean accountNonExpired,
        boolean accountNonLocked,
        boolean credentialsNonExpired,
        boolean enabled
) {}
