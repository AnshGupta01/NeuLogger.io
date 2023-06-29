package com.ansh.blog.blogappapis.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    
    private int id;
    @NotEmpty
    @Size(min = 4, message = "User's name must be greater than 4 characters")
    private String name;

    @Email(message = "Your Email Address is not valid")
    private String email;

    @NotEmpty(message = "Password cannot be empty")
    @Size(min=3, max=10, message = "Password cannot be less than 3 characters or more than 10 characters")
    private String password;

    @NotEmpty
    private String about;
}

