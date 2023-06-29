package com.ansh.blog.blogappapis.repository;

import com.ansh.blog.blogappapis.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role,Integer> {
}
