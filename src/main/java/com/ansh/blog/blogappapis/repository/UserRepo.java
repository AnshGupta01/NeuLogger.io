package com.ansh.blog.blogappapis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansh.blog.blogappapis.entity.User;

public interface UserRepo extends JpaRepository<User, Integer>{
    
}
