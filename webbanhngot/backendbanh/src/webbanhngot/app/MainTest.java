package webbanhngot.app;

import java.time.LocalDateTime;
import java.util.ArrayList;

import webbanhngot.entity.Review;
import webbanhngot.repository.ReviewRepository;

public class MainTest {
    public static void main(String[] args) {
        ReviewRepository reviewRepository = new ReviewRepository();

        Integer testReviewId = 9999;

        // Xoa truoc neu lan truoc test bi dung giua chung
        reviewRepository.deleteReview(testReviewId);

        // C - CREATE
        Review newReview = new Review();
        newReview.setReviews_id(testReviewId);
        newReview.setOrder_detail_id(1001);
        newReview.setCreate_at(LocalDateTime.now());
        newReview.setCustomer_comment("Test review from JDBC");
        newReview.setRating(5);

        boolean addResult = reviewRepository.addReview(newReview);

        System.out.println("=== INSERT REVIEW ===");
        System.out.println("Them review thanh cong khong? " + addResult);

        // R - READ BY ID
        Review foundAfterInsert = reviewRepository.getReviewByID(testReviewId);

        System.out.println("\n=== READ REVIEW SAU INSERT ===");
        if (foundAfterInsert != null) {
            System.out.println("Tim thay: " + foundAfterInsert);
        } else {
            System.out.println("Khong tim thay review sau insert");
        }

        // U - UPDATE
        Review updatedReview = new Review();
        updatedReview.setReviews_id(testReviewId);
        updatedReview.setOrder_detail_id(1001);
        updatedReview.setCreate_at(LocalDateTime.now());
        updatedReview.setCustomer_comment("Updated review from JDBC");
        updatedReview.setRating(4);

        boolean updateResult = reviewRepository.updateReview(testReviewId, updatedReview);

        System.out.println("\n=== UPDATE REVIEW ===");
        System.out.println("Update review thanh cong khong? " + updateResult);

        Review foundAfterUpdate = reviewRepository.getReviewByID(testReviewId);

        System.out.println("\n=== READ REVIEW SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay review sau update");
        }

        // R - READ ALL
        ArrayList<Review> reviewList = reviewRepository.getAllReviews();

        System.out.println("\n=== DANH SACH REVIEW TU DATABASE ===");
        System.out.println("So luong review hien tai: " + reviewList.size());

        for (int i = 0; i < Math.min(5, reviewList.size()); i++) {
            System.out.println(reviewList.get(i));
        }

        // D - DELETE
        boolean deleteResult = reviewRepository.deleteReview(testReviewId);

        System.out.println("\n=== DELETE REVIEW ===");
        System.out.println("Delete review thanh cong khong? " + deleteResult);

        Review foundAfterDelete = reviewRepository.getReviewByID(testReviewId);

        System.out.println("\n=== READ REVIEW SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con reviews_id = " + testReviewId);
        } else {
            System.out.println("Van con review: " + foundAfterDelete);
        }
    }
}