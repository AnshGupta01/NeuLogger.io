package com.ansh.blog.blogappapis.services;

import com.ansh.blog.blogappapis.payloads.CommentDto;

public interface CommentService {
    CommentDto createComment(CommentDto commentDto, Integer postId);
    void deleteComment(Integer commentId);
}
