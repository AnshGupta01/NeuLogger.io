package com.ansh.blog.blogappapis.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    
    private int id;

    @NotEmpty(message = "Name cannot be empty")
    @Size(min = 4, message = "User's name must be greater than 4 characters")
    private String name;

    @NotEmpty(message = "Email cannot be empty")
    @Email(message = "Your Email Address is not valid")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    @Size(min=3, max=10, message = "Password cannot be less than 3 characters or more than 10 characters")
    private String password;

    @NotEmpty(message = "About cannot be empty")
    private String about;

    private Set<RoleDto> roles= new HashSet<>();
}

