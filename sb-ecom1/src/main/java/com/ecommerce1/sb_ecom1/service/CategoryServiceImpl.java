package com.ecommerce1.sb_ecom1.service;

import com.ecommerce1.sb_ecom1.exceptions.APIException;
import com.ecommerce1.sb_ecom1.exceptions.ResourceNotFoundException;
import com.ecommerce1.sb_ecom1.model.Category;
import com.ecommerce1.sb_ecom1.payload.CategoryDTO;
import com.ecommerce1.sb_ecom1.payload.CategoryResponse;
import com.ecommerce1.sb_ecom1.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
//    private List<Category> categories=new ArrayList<>();
//    private Long nextId = 1L;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CategoryResponse getAllCategories(Integer pageNumber,Integer pageSize,String sortBy,String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending():Sort.by(sortBy).descending();

        Pageable pageDetails = PageRequest.of(pageNumber,pageSize,sortByAndOrder);
        Page<Category> categoryPage= categoryRepository.findAll(pageDetails);

        List<Category> categories = categoryPage.getContent();
        List<CategoryDTO> categoryDTOS=categories.stream()
                .map(category-> modelMapper.map(category,CategoryDTO.class))
                .toList();

        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setContent(categoryDTOS);
        categoryResponse.setPageNumber(categoryPage.getNumber());
        categoryResponse.setPageSize(categoryPage.getSize());
        categoryResponse.setTotalElements(categoryPage.getTotalElements());
        categoryResponse.setTotalPages(categoryPage.getTotalPages());
        categoryResponse.setLastPage(categoryPage.isLast());

        return categoryResponse;
    }
    @Override
   public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category=modelMapper.map(categoryDTO,Category.class);
      Category categoryFromDb = categoryRepository.findByCategoryName(category.getCategoryName());
       if(categoryFromDb != null)
            throw new APIException("Category with the name" + category.getCategoryName() + "already exists !!!");
        //category.setCategoryId(nextId++);
       Category savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory,CategoryDTO.class);

   }

    public CategoryDTO deleteCategory(Long categoryId){

        Category category=categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category","categoryId",categoryId));

        categoryRepository.delete(category);
        // return "Category with categoryId :  "+categoryId+" deleted successfully !!";
        return modelMapper.map(category,CategoryDTO.class);
    }

    @Override
    public CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId) {

        Category savedCategory=categoryRepository.findById(categoryId)
                .orElseThrow(()->new ResourceNotFoundException("Category","categoryId",categoryId));

        Category category = modelMapper.map(categoryDTO,Category.class);
        category.setCategoryId(categoryId);
        savedCategory=categoryRepository.save(category);
        return modelMapper.map(savedCategory,CategoryDTO.class);
    }
}
