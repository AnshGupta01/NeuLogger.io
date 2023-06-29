package com.ansh.blog.blogappapis.services;
import java.util.List;
import com.ansh.blog.blogappapis.payloads.PostDto;
import com.ansh.blog.blogappapis.payloads.PostResponse;

public interface PostService {
    //create
    PostDto createPost(PostDto postdto, Integer userId, Integer categoryId);

    //update
    PostDto updatePost(PostDto postdto, Integer postId);

    //delete
    void deletePost(Integer postId);

    //get all posts
    PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);

    //get single post
    PostDto getPostById(Integer postId);

    //get all post by category
    List<PostDto> getPostsByCategory (Integer categoryId);

    //get all posts by one user
    PostResponse getPostsByUser (Integer userId,Integer pageNumber,Integer pageSize);

    //search
    List<PostDto> searchPosts(String keyword);
}
