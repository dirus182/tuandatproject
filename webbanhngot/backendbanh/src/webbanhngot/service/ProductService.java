package webbanhngot.service;

import java.math.BigDecimal;
import java.util.ArrayList;

import webbanhngot.entity.Product;
import webbanhngot.repository.ProductRepository;

public class ProductService {

    private ProductRepository productRepository = new ProductRepository();

    // C - Create
    public boolean addProduct(Product product) {
        if (!isValidProduct(product)) {
            return false;
        }

        Product existingProduct = productRepository.getProductByCakeID(product.getCake_id());

        if (existingProduct != null) {
            return false;
        }

        return productRepository.addProduct(product);
    }

    // R - Read all
    public ArrayList<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    // R - Read by cake_id
    public Product getProductByCakeID(Integer cake_id) {
        if (cake_id == null) {
            return null;
        }

        return productRepository.getProductByCakeID(cake_id);
    }

    // U - Update
    public boolean updateProduct(Integer cake_id, Product newProduct) {
        if (cake_id == null || !isValidProduct(newProduct)) {
            return false;
        }

        Product existingProduct = productRepository.getProductByCakeID(cake_id);

        if (existingProduct == null) {
            return false;
        }

        return productRepository.updateProduct(cake_id, newProduct);
    }

    // D - Delete
    public boolean deleteProduct(Integer cake_id) {
        if (cake_id == null) {
            return false;
        }

        Product existingProduct = productRepository.getProductByCakeID(cake_id);

        if (existingProduct == null) {
            return false;
        }

        return productRepository.deleteProduct(cake_id);
    }

    private boolean isValidProduct(Product product) {
        if (product == null) {
            return false;
        }

        if (product.getCake_id() == null || product.getCake_id() <= 0) {
            return false;
        }

        if (product.getOption_cake_id() == null || product.getOption_cake_id() <= 0) {
            return false;
        }

        if (product.getQuantity() == null || product.getQuantity() < 0) {
            return false;
        }

        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            return false;
        }

        if (product.getCake_name() == null || product.getCake_name().isBlank()) {
            return false;
        }

        return true;
    }
}