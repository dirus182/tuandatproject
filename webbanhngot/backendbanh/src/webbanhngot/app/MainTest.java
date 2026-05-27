package webbanhngot.app;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import webbanhngot.entity.Product;
import webbanhngot.repository.ProductRepository;

public class MainTest {
    public static void main(String[] args) {
        ProductRepository productRepository = new ProductRepository();

        Integer testCakeId = 9999;

        // Xoa truoc neu lan truoc test bi dung giua chung
        productRepository.deleteProduct(testCakeId);

        // =========================
        // C - CREATE
        // =========================
        Product newProduct = new Product(
                testCakeId,
                1,
                50,
                new BigDecimal("9.99"),
                new String[] { "Test product from JDBC" },
                "Test Cake",
                LocalDateTime.now()
        );

        boolean addResult = productRepository.addProduct(newProduct);

        System.out.println("=== INSERT PRODUCT ===");
        System.out.println("Them product thanh cong khong? " + addResult);

        // =========================
        // R - READ BY ID
        // =========================
        Product foundAfterInsert = productRepository.getProductByCakeID(testCakeId);

        System.out.println("\n=== READ PRODUCT SAU INSERT ===");
        if (foundAfterInsert != null) {
            System.out.println("Tim thay: " + foundAfterInsert);
        } else {
            System.out.println("Khong tim thay product sau insert");
        }

        // =========================
        // U - UPDATE
        // =========================
        Product updatedProduct = new Product(
                testCakeId,
                2,
                60,
                new BigDecimal("12.99"),
                new String[] { "Updated product from JDBC" },
                "Updated Cake",
                LocalDateTime.now()
        );

        boolean updateResult = productRepository.updateProduct(testCakeId, updatedProduct);

        System.out.println("\n=== UPDATE PRODUCT ===");
        System.out.println("Update product thanh cong khong? " + updateResult);

        Product foundAfterUpdate = productRepository.getProductByCakeID(testCakeId);

        System.out.println("\n=== READ PRODUCT SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay product sau update");
        }

        // =========================
        // R - READ ALL
        // =========================
        ArrayList<Product> productList = productRepository.getAllProducts();

        System.out.println("\n=== DANH SACH PRODUCT TU DATABASE ===");
        System.out.println("So luong product hien tai: " + productList.size());

        // =========================
        // D - DELETE
        // =========================
        boolean deleteResult = productRepository.deleteProduct(testCakeId);

        System.out.println("\n=== DELETE PRODUCT ===");
        System.out.println("Delete product thanh cong khong? " + deleteResult);

        Product foundAfterDelete = productRepository.getProductByCakeID(testCakeId);

        System.out.println("\n=== READ PRODUCT SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con product cake_id = " + testCakeId);
        } else {
            System.out.println("Van con product: " + foundAfterDelete);
        }
    }
}