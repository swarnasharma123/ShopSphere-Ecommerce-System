package com.ecommerce1.sb_ecom1.repositories;

import com.ecommerce1.sb_ecom1.model.Category;
import com.ecommerce1.sb_ecom1.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findByCategoryOrderByPriceAsc(Category category, Pageable pageDetails);

    Page<Product> findByProductNameLikeIgnoreCase(String s, Pageable pageDetails);

    Product findByProductNameIgnoreCase(String productName);
}
