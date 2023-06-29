package com.ansh.blog.blogappapis.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansh.blog.blogappapis.entity.Category;

public interface CategoryRepo extends JpaRepository< Category, Integer >{
    
}
