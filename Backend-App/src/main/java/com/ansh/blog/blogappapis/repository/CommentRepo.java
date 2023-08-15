package com.ansh.blog.blogappapis.repository;

import com.ansh.blog.blogappapis.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Integer> {


}
