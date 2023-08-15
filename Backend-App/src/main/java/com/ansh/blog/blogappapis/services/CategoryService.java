package com.ansh.blog.blogappapis.services;

import com.ansh.blog.blogappapis.payloads.CategoryDto;

import java.util.List;

public interface CategoryService {
    //no need to use public keyword in interfaces
    //create
    CategoryDto createCategory(CategoryDto categoryDto);
    //update
    CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId);
    //delete
    void deleteCategory(Integer categoryId);
    //get
    CategoryDto getCategory(Integer categoryId);
    //get-all
    List<CategoryDto> getCategories();
}
