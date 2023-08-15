package com.ansh.blog.blogappapis.repository;

import com.ansh.blog.blogappapis.entity.Category;
import com.ansh.blog.blogappapis.entity.Post;
import com.ansh.blog.blogappapis.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepo extends JpaRepository<Post,Integer> {   
    List<Post> findByUser(User user);
    List<Post> findByCategory(Category category);
    Page<Post> findByUserId(Integer userId, Pageable pageable);

    @Query("select p from Post p where p.title like :key")
    List<Post> searchByTitle(@Param("key") String title);
}
