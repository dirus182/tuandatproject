package com.webbanhngot.backendbanh.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

import com.webbanhngot.backendbanh.entity.Product;
import com.webbanhngot.backendbanh.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService = new ProductService();

    // =========================
    // READ ALL
    // GET /api/products
    // =========================
    @GetMapping
    public ArrayList<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // =========================
    // READ BY ID
    // GET /api/products/{id}
    // =========================
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable("id") Integer cakeId) {
        return productService.getProductByCakeID(cakeId);
    }

    // =========================
    // CREATE
    // POST /api/products
    // Body: JSON Product
    // =========================
    @PostMapping
    public boolean createProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // =========================
    // UPDATE
    // PUT /api/products/{id}
    // Body: JSON Product
    // =========================
    @PutMapping("/{id}")
    public boolean updateProduct(@PathVariable("id") Integer cakeId,
                                 @RequestBody Product updatedProduct) {
        return productService.updateProduct(cakeId, updatedProduct);
    }

    // =========================
    // DELETE
    // DELETE /api/products/{id}
    // =========================
    @DeleteMapping("/{id}")
    public boolean deleteProduct(@PathVariable("id") Integer cakeId) {
        return productService.deleteProduct(cakeId);
    }
}
/*
Flow tổng quan khi gọi API
Client (trình duyệt hoặc frontend) gọi GET /api/products.
Spring Boot map URL tới getAllProducts().
Controller gọi productService.getAllProducts().
Service gọi ProductRepository.getAllProducts() → query DB.
Repository trả về danh sách Product.
Service có thể xử lý logic bổ sung (nếu có).
Controller trả về JSON cho client. */