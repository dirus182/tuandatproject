package webbanhngot.app;

import java.util.ArrayList;

import webbanhngot.entity.Product;
import webbanhngot.repository.ProductRepository;

public class MainTest {
    public static void main(String[] args) {
        ProductRepository productRepository = new ProductRepository();

        ArrayList<Product> productList = productRepository.getAllProducts();

        System.out.println("=== DANH SACH PRODUCT TU DATABASE ===");
        System.out.println("So luong product: " + productList.size());

        for (Product product : productList) {
            System.out.println(product);
        }

        if (!productList.isEmpty()) {
            Integer firstCakeId = productList.get(0).getCake_id();

            System.out.println("\n=== TIM PRODUCT THEO cake_id = " + firstCakeId + " ===");

            Product foundProduct = productRepository.getProductByCakeID(firstCakeId);

            if (foundProduct != null) {
                System.out.println("Tim thay: " + foundProduct);
            } else {
                System.out.println("Khong tim thay product");
            }
        } else {
            System.out.println("\nBang product dang rong, chua co du lieu de tim theo ID.");
        }
    }
}