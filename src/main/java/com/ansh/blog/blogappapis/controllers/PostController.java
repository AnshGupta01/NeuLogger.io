package com.ansh.blog.blogappapis.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ansh.blog.blogappapis.config.AppConstants;
import com.ansh.blog.blogappapis.payloads.ApiResponse;
import com.ansh.blog.blogappapis.payloads.PostDto;
import com.ansh.blog.blogappapis.payloads.PostResponse;
import com.ansh.blog.blogappapis.services.PostService;

@RestController
@RequestMapping("/api/")
public class PostController {
    
    @Autowired
    private PostService postService;

    //create
    @PostMapping("/user/{userId}/category/{categoryId}/posts")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postdto,
                                            @PathVariable Integer userId,
                                            @PathVariable Integer categoryId)
    {
        PostDto createPost = this.postService.createPost(postdto, userId, categoryId);
        return new ResponseEntity<PostDto>(createPost, HttpStatus.CREATED);
    }

    //get by user
    @GetMapping("/user/{userid}/posts")
    public ResponseEntity <PostResponse> getPostsByUser(@PathVariable Integer userid,
            @RequestParam(value = "pageNumber",defaultValue = AppConstants.PAGE_NUMBER,required = false) Integer pageNumber,
            @RequestParam(value = "pageSize",defaultValue = AppConstants.PAGE_SIZE,required = false) Integer pageSize){

        PostResponse posts = this.postService.getPostsByUser(userid, pageNumber,pageSize);
        return new ResponseEntity<PostResponse>(posts, HttpStatus.OK);
    }

    //get by category
    @GetMapping("/category/{categoryId}/posts")
    public ResponseEntity <List<PostDto>> getPostsByCategory(@PathVariable Integer categoryId){
        List<PostDto> posts = this.postService.getPostsByCategory(categoryId);
        return new ResponseEntity<List<PostDto>>(posts, HttpStatus.OK);
    }

    //get all posts
    @GetMapping("/posts")
    public ResponseEntity<PostResponse> getAllPosts(@RequestParam(value = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber
                                                    ,@RequestParam(value = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize
                                                    ,@RequestParam(value = "sortBy", defaultValue = AppConstants.SORT_BY,required = false) String sortBy
                                                    ,@RequestParam(value = "sortDir", defaultValue = AppConstants.SORT_DIR,required = false) String sortDir){
        PostResponse allPosts = this.postService.getAllPosts(pageNumber, pageSize, sortBy, sortDir);
        return new ResponseEntity<PostResponse>(allPosts, HttpStatus.OK);
    }

    //get post by id
    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Integer postId){
        PostDto postdto = this.postService.getPostById(postId);
        return new ResponseEntity<PostDto>(postdto, HttpStatus.OK);
    }

    //delete post by id
    @DeleteMapping("/posts/{postId}")
    public ApiResponse deletePost(@PathVariable Integer postId){
        this.postService.deletePost(postId);
        return new ApiResponse("Your post is successfully deleted", true);
    }

    //update post by id
    @PutMapping("/posts/{postId}")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postdto,@PathVariable Integer postId){
        this.postService.updatePost(postdto, postId);
        return new ResponseEntity<PostDto>(postdto, HttpStatus.OK);
    }

    //search
    @GetMapping("/posts/search/{keywords}")
    public ResponseEntity<List<PostDto>> searchPostByTitle(
                        @PathVariable("keywords") String keywords){

        List<PostDto> result = this.postService.searchPosts(keywords);
        return new ResponseEntity<List<PostDto>>(result, HttpStatus.OK);
    }
}
