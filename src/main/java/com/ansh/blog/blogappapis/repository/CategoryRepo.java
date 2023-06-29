package com.ansh.blog.blogappapis.repository;

import com.ansh.blog.blogappapis.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository< Category, Integer >{
    
}
