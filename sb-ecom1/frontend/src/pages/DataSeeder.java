package com.ecommerce1.sb_ecom1.config;

import com.ecommerce1.sb_ecom1.model.Category;
import com.ecommerce1.sb_ecom1.model.Product;
import com.ecommerce1.sb_ecom1.repositories.CategoryRepository;
import com.ecommerce1.sb_ecom1.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedCatalog(CategoryRepository categoryRepository,
                                         ProductRepository productRepository) {
        return args -> {
            if (categoryRepository.count() > 0) {
                seedMissingCategories(categoryRepository);
                seedMissingProducts(categoryRepository, productRepository);
                normalizeExistingProductImages(productRepository);
                return;
            }

            Category electronics = new Category();
            electronics.setCategoryName("Electronics");

            Category fashion = new Category();
            fashion.setCategoryName("Fashion");

            Category home = new Category();
            home.setCategoryName("Home & Kitchen");

            Category beauty = new Category();
            beauty.setCategoryName("Beauty & Personal Care");

            Category groceries = new Category();
            groceries.setCategoryName("Groceries");

            Category books = new Category();
            books.setCategoryName("Books & Stationery");

            Category toys = new Category();
            toys.setCategoryName("Toys & Baby Products");

            categoryRepository.saveAll(List.of(electronics, fashion, home, beauty, groceries, books, toys));

            Product phone = new Product();
            phone.setProductName("Smartphone X");
            phone.setDescription("Powerful phone with OLED display");
            phone.setImage(resolveImageUrl("Smartphone X"));
            phone.setQuantity(25);
            phone.setPrice(29999);
            phone.setDiscount(10);
            phone.setSpecialPrice(phone.getPrice() - (phone.getPrice() * phone.getDiscount() / 100));
            phone.setCategory(electronics);

            Product jacket = new Product();
            jacket.setProductName("Denim Jacket");
            jacket.setDescription("Classic fit denim jacket");
            jacket.setImage(resolveImageUrl("Denim Jacket"));
            jacket.setQuantity(40);
            jacket.setPrice(1999);
            jacket.setDiscount(5);
            jacket.setSpecialPrice(jacket.getPrice() - (jacket.getPrice() * jacket.getDiscount() / 100));
            jacket.setCategory(fashion);

            Product blender = new Product();
            blender.setProductName("Kitchen Blender");
            blender.setDescription("Multi-speed blender with jar");
            blender.setImage(resolveImageUrl("Kitchen Blender"));
            blender.setQuantity(15);
            blender.setPrice(3499);
            blender.setDiscount(12);
            blender.setSpecialPrice(blender.getPrice() - (blender.getPrice() * blender.getDiscount() / 100));
            blender.setCategory(home);

            productRepository.saveAll(List.of(phone, jacket, blender));

                seedMissingProducts(categoryRepository, productRepository);
                normalizeExistingProductImages(productRepository);
        };
    }

    private void seedMissingCategories(CategoryRepository categoryRepository) {
        ensureCategory(categoryRepository, "Electronics");
        ensureCategory(categoryRepository, "Fashion");
        ensureCategory(categoryRepository, "Home & Kitchen");
        ensureCategory(categoryRepository, "Girls Fashion");
        ensureCategory(categoryRepository, "Beauty & Personal Care");
        ensureCategory(categoryRepository, "Sports & Fitness");
        ensureCategory(categoryRepository, "Books & Stationery");
        ensureCategory(categoryRepository, "Groceries");
        ensureCategory(categoryRepository, "Toys & Baby Products");
    }

    private void ensureCategory(CategoryRepository categoryRepository, String categoryName) {
        if (categoryRepository.findByCategoryName(categoryName) != null) {
            return;
        }
        Category category = new Category();
        category.setCategoryName(categoryName);
        categoryRepository.save(category);
    }

            private void seedMissingProducts(CategoryRepository categoryRepository,
                             ProductRepository productRepository) {
            createIfMissing(productRepository, categoryRepository, "Smartphone X",
                "Powerful phone with OLED display", 25, 29999, 10, "Electronics");
            createIfMissing(productRepository, categoryRepository, "Denim Jacket",
                "Classic fit denim jacket", 40, 1999, 5, "Fashion");
            createIfMissing(productRepository, categoryRepository, "Kitchen Blender",
                "Multi-speed blender with jar", 15, 3499, 12, "Home & Kitchen");
            createIfMissing(productRepository, categoryRepository, "Girls Fashion",
                "Trendy girls fashion essentials", 22, 1499, 8, "Girls Fashion");
            createIfMissing(productRepository, categoryRepository, "Daily Skincare Set",
                "Glow-boosting skincare kit", 12, 1499, 10, "Beauty & Personal Care");
            createIfMissing(productRepository, categoryRepository, "Fitness Essentials",
                "Workout gear starter pack", 18, 1999, 8, "Sports & Fitness");
            createIfMissing(productRepository, categoryRepository, "Best Sellers Pack",
                "Bestselling books bundle", 20, 899, 12, "Books & Stationery");
            createIfMissing(productRepository, categoryRepository, "Daily Grocery Box",
                "Everyday grocery essentials", 30, 699, 6, "Groceries");
            createIfMissing(productRepository, categoryRepository, "Kids Starter Kit",
                "Toys and baby starter kit", 16, 1299, 9, "Toys & Baby Products");
            }

            private void createIfMissing(ProductRepository productRepository,
                         CategoryRepository categoryRepository,
                         String productName,
                         String description,
                         int quantity,
                         double price,
                         double discount,
                         String categoryName) {
            if (productRepository.findByProductNameIgnoreCase(productName) != null) {
                return;
            }

            Category category = categoryRepository.findByCategoryName(categoryName);
            if (category == null) {
                return;
            }

            Product product = new Product();
            product.setProductName(productName);
            product.setDescription(description);
            product.setImage(resolveImageUrl(productName));
            product.setQuantity(quantity);
            product.setPrice(price);
            product.setDiscount(discount);
            product.setSpecialPrice(price - (price * discount / 100));
            product.setCategory(category);
            productRepository.save(product);
            }

            private void normalizeExistingProductImages(ProductRepository productRepository) {
                List<Product> products = productRepository.findAll();
                for (Product product : products) {
                    String image = product.getImage();
                    boolean needsUpdate = image == null || image.isBlank();
                    if (!needsUpdate) {
                        String lower = image.toLowerCase();
                        if (!lower.startsWith("http") || lower.contains("anindigoday.com")) {
                            needsUpdate = true;
                        }
                    }
                    if (needsUpdate) {
                        product.setImage(resolveImageUrl(product.getProductName()));
                        productRepository.save(product);
                    }
                }
            }

            private String resolveImageUrl(String productName) {
                String key = productName == null ? "" : productName.toLowerCase();
                if (key.contains("smartphone")) {
                    return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80";
                }
                if (key.contains("denim")) {
                    return "https://picsum.photos/id/1050/900/900";
                }
                if (key.contains("blender") || key.contains("kitchen")) {
                    return "https://picsum.photos/id/1060/900/900";
                }
                if (key.contains("fashion")) {
                    return "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=900&q=80";
                }
                if (key.contains("skincare") || key.contains("beauty")) {
                    return "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80";
                }
                if (key.contains("fitness") || key.contains("workout")) {
                    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80";
                }
                if (key.contains("book")) {
                    return "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80";
                }
                if (key.contains("grocery")) {
                    return "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";
                }
                if (key.contains("kids") || key.contains("baby") || key.contains("toy")) {
                    return "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80";
                }
                return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80";
            }
}
