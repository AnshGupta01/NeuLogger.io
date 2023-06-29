package com.ansh.blog.blogappapis.services.impl;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.ansh.blog.blogappapis.entity.Category;
import com.ansh.blog.blogappapis.entity.Post;
import com.ansh.blog.blogappapis.entity.User;
import com.ansh.blog.blogappapis.exceptions.ResourceNotFoundException;
import com.ansh.blog.blogappapis.payloads.PostDto;
import com.ansh.blog.blogappapis.payloads.PostResponse;
import com.ansh.blog.blogappapis.repository.CategoryRepo;
import com.ansh.blog.blogappapis.repository.PostRepo;
import com.ansh.blog.blogappapis.repository.UserRepo;
import com.ansh.blog.blogappapis.services.PostService;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    private PostRepo postrepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CategoryRepo categoryRepo;

    @Override
    public PostDto createPost(PostDto postdto, Integer userId, Integer categoryId) {

        User user = this.userRepo.findById(userId)
                    .orElseThrow(()-> new ResourceNotFoundException("User", "User id", userId));

        Category category = this.categoryRepo.findById(categoryId)
                            .orElseThrow(()-> new ResourceNotFoundException("Category", "Category id", categoryId));

        Post post = this.modelMapper.map(postdto, Post.class);
        post.setImageName("default.png");
        post.setAddedDate(new Date());
        post.setUser(user);
        post.setCategory(category);

        Post newPost = this.postrepo.save(post);
        return this.modelMapper.map(newPost, PostDto.class);
    }

    @Override
    public PostDto updatePost(PostDto postdto, Integer postId) {
        Post post = this.postrepo.findById(postId).orElseThrow(()-> new ResourceNotFoundException("Post","PostId", postId));
        post.setTitle(postdto.getTitle());
        post.setContent(postdto.getContent());
        post.setImageName(postdto.getImageName());
        Post updatedPost = this.postrepo.save(post);
        return this.modelMapper.map(updatedPost, PostDto.class);
    }

    @Override
    public void deletePost(Integer postId) {
        Post post = this.postrepo.findById(postId)
                    .orElseThrow(()-> new ResourceNotFoundException("Post","PostId", postId));
        this.postrepo.delete(post);
    }

    @Override
    public PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        
        Sort sort=null;
        if(sortDir.equalsIgnoreCase("asc")){
            sort=Sort.by(sortBy).ascending();
        }else{
            sort=Sort.by(sortBy).descending();
        }

        Pageable p = PageRequest.of(pageNumber, pageSize, sort);

        Page<Post> pagePost = this.postrepo.findAll(p);

        List<Post> posts = pagePost.getContent();

        List<PostDto> postDtos = posts.stream().map((post)-> this.modelMapper.map(post, PostDto.class))
                                .collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();
        postResponse.setContent(postDtos);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setLastPage(pagePost.isLast());

        return postResponse;
    }

    @Override
    public PostDto getPostById(Integer postId) {
        Post post = this.postrepo.findById(postId)
                    .orElseThrow(()-> new ResourceNotFoundException("Post", "Post Id", postId));
        return this.modelMapper.map(post, PostDto.class);
    }

    @Override
    public List<PostDto> getPostsByCategory(Integer categoryId) {
        Category cat = this.categoryRepo.findById(categoryId)
                        .orElseThrow(()-> new ResourceNotFoundException("category", "Category Id", categoryId));
        List<Post> posts = this.postrepo.findByCategory(cat);
        List<PostDto> postDtos = posts.stream().map((post)-> this.modelMapper.map(post, PostDto.class))
                                .collect(Collectors.toList());
        return postDtos;            
    }

    @Override
    public PostResponse getPostsByUser(Integer userId,Integer pageNumber,Integer pageSize) {
        this.userRepo.findById(userId)
                    .orElseThrow(()-> new ResourceNotFoundException("User", "User Id", userId));

        Pageable p = PageRequest.of(pageNumber,pageSize);
        Page<Post> pagePost = this.postrepo.findByUserId(userId, p);            
        List<Post> posts = pagePost.getContent();

        List<PostDto> postDtos = posts.stream().map((post)->this.modelMapper.map(post,PostDto.class)).collect(Collectors.toList());          
        
        PostResponse postResponse = new PostResponse();
        postResponse.setContent(postDtos);
        postResponse.setPageNumber(pagePost.getNumber());
        postResponse.setPageSize(pagePost.getSize());
        postResponse.setTotalPages(pagePost.getTotalPages());
        postResponse.setTotalElements(pagePost.getTotalElements());
        postResponse.setLastPage(pagePost.isLast());

        return postResponse;
    }

    @Override
    public List<PostDto> searchPosts(String keyword) {
        List<Post> posts = this.postrepo.searchByTitle("%"+keyword+"%");
        List<PostDto> postDto = posts.stream().map((post)
        ->this.modelMapper.map(post,PostDto.class)).collect(Collectors.toList());

        return postDto;
    }
    
}
