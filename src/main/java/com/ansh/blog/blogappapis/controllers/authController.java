package com.ansh.blog.blogappapis.controllers;

import com.ansh.blog.blogappapis.exceptions.ApiException;
import com.ansh.blog.blogappapis.payloads.JwtAuthRequest;
import com.ansh.blog.blogappapis.payloads.JwtAuthResponse;
import com.ansh.blog.blogappapis.payloads.UserDto;
import com.ansh.blog.blogappapis.security.JwtTokenHelper;
import com.ansh.blog.blogappapis.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class authController {

    @Autowired
    private JwtTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> createToken(
            @RequestBody JwtAuthRequest request
            ) throws Exception {

        this.authenticate(request.getUsername(),request.getPassword());

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());
        String generatedToken = this.jwtTokenHelper.generateToken(userDetails);
        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(generatedToken);
        return new ResponseEntity<JwtAuthResponse>(response, HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws Exception {
        UsernamePasswordAuthenticationToken upat =
                new UsernamePasswordAuthenticationToken(username,password);

        try{
            this.authenticationManager.authenticate(upat);
        } catch(BadCredentialsException e){
            System.out.println("Invalid Details");
            throw new ApiException("Invalid Username or password");
        }
    }

    //register new user api
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto){
        UserDto newUser = this.userService.registerNewUser(userDto);
        return new ResponseEntity<UserDto>(newUser,HttpStatus.CREATED);
    }
}
