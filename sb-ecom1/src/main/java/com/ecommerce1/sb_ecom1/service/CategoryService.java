package com.ecommerce1.sb_ecom1.service;

import com.ecommerce1.sb_ecom1.payload.CategoryDTO;
import com.ecommerce1.sb_ecom1.payload.CategoryResponse;

public interface CategoryService {
    CategoryResponse getAllCategories(Integer pageNumber,Integer pageSize,String sortBy,String sortOrder);

    CategoryDTO createCategory(CategoryDTO categoryDTO);

    CategoryDTO deleteCategory(Long categoryId);

    CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId);
}
