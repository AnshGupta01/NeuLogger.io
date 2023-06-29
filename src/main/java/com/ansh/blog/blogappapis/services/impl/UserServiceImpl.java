package com.ansh.blog.blogappapis.services.impl;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansh.blog.blogappapis.entity.User;
import com.ansh.blog.blogappapis.payloads.UserDto;
import com.ansh.blog.blogappapis.repository.UserRepo;
import com.ansh.blog.blogappapis.services.UserService;
import com.ansh.blog.blogappapis.exceptions.ResourceNotFoundException;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = this.dtoToUser(userDto);
        User savedUser = this.userRepo.save(user);
        return this.usertoDto(savedUser);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Integer userId) {
        User user = this.userRepo.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User","id", userId));
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setAbout(userDto.getAbout());

        User updatedUser = this.userRepo.save(user);
        UserDto userDto1 = this.usertoDto(updatedUser);
        return userDto1;
    }

    @Override
    public UserDto getUserById(Integer userId) {
        User user = this.userRepo.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User","id", userId));
        return this.usertoDto(user);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = this.userRepo.findAll();
        List<UserDto> userDtos = users.stream().map(user->this.usertoDto(user)).collect(Collectors.toList());
        return userDtos;
    }

    @Override
    public void deleteUser(Integer userId) {
        User user = this.userRepo.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User","id", userId));
        this.userRepo.delete(user);
    }

    private User dtoToUser(UserDto userDto){
        User user = this.modelMapper.map(userDto, User.class);

        //All lines the above text replaced 
        // user.setId(userDto.getId());
        // user.setName(userDto.getName());
        // user.setPassword(userDto.getPassword());
        // user.setEmail(userDto.getEmail());
        // user.setAbout(userDto.getAbout());
        return user;
    }

    public UserDto usertoDto(User user){
        UserDto userDto = this.modelMapper.map(user, UserDto.class);
        return userDto;
    }
}
