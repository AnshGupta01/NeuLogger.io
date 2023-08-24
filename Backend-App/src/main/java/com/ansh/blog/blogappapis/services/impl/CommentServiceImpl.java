package com.ansh.blog.blogappapis.services.impl;

import com.ansh.blog.blogappapis.entity.Comment;
import com.ansh.blog.blogappapis.entity.Post;
import com.ansh.blog.blogappapis.exceptions.ResourceNotFoundException;
import com.ansh.blog.blogappapis.payloads.CommentDto;
import com.ansh.blog.blogappapis.repository.CommentRepo;
import com.ansh.blog.blogappapis.repository.PostRepo;
import com.ansh.blog.blogappapis.services.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private PostRepo postRepo;
    @Autowired
    private CommentRepo commentRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public CommentDto createComment(CommentDto commentDto, Integer postId) {

        Post post = this.postRepo.findById(postId)
                .orElseThrow(()-> new ResourceNotFoundException("Post","PostId",postId));

        Comment comment = this.modelMapper.map(commentDto, Comment.class);
        comment.setPost(post);
        comment.setUser(post.getUser());
        comment.setUsername(post.getUser().getUsername());
        Comment savedComm = this.commentRepo.save(comment);
        return this.modelMapper.map(savedComm, CommentDto.class);
    }

    @Override
    public void deleteComment(Integer commentId) {
        Comment comment = this.commentRepo.findById(commentId)
                .orElseThrow(()-> new ResourceNotFoundException("comment","comment Id",commentId));

        this.commentRepo.delete(comment);

    }
}
