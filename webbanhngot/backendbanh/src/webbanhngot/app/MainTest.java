package webbanhngot.app;

import java.time.LocalDateTime;
import java.util.ArrayList;

import webbanhngot.entity.Review;
import webbanhngot.service.ReviewService;

public class MainTest {
    public static void main(String[] args) {
        ReviewService reviewService = new ReviewService();

        Integer testReviewId = 9999;

        // Don rac test cu neu co
        reviewService.deleteReview(testReviewId);

        // C - CREATE
        Review review = new Review();
        review.setReviews_id(testReviewId);
        review.setOrder_detail_id(1001);
        review.setCreate_at(LocalDateTime.now());
        review.setCustomer_comment("Test review from ReviewService");
        review.setRating(5);

        boolean addResult = reviewService.addReview(review);

        System.out.println("=== SERVICE INSERT REVIEW ===");
        System.out.println("Them review thanh cong khong? " + addResult);

        // R - READ BY ID
        Review foundAfterInsert = reviewService.getReviewByID(testReviewId);

        System.out.println("\n=== SERVICE READ REVIEW SAU INSERT ===");
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
        updatedReview.setCustomer_comment("Updated review from ReviewService");
        updatedReview.setRating(4);

        boolean updateResult = reviewService.updateReview(testReviewId, updatedReview);

        System.out.println("\n=== SERVICE UPDATE REVIEW ===");
        System.out.println("Update review thanh cong khong? " + updateResult);

        Review foundAfterUpdate = reviewService.getReviewByID(testReviewId);

        System.out.println("\n=== SERVICE READ REVIEW SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay review sau update");
        }

        // R - READ ALL
        ArrayList<Review> reviewList = reviewService.getAllReviews();

        System.out.println("\n=== SERVICE DANH SACH REVIEW TU DATABASE ===");
        System.out.println("So luong review hien tai: " + reviewList.size());

        for (int i = 0; i < Math.min(5, reviewList.size()); i++) {
            System.out.println(reviewList.get(i));
        }

        // D - DELETE
        boolean deleteResult = reviewService.deleteReview(testReviewId);

        System.out.println("\n=== SERVICE DELETE REVIEW ===");
        System.out.println("Delete review thanh cong khong? " + deleteResult);

        Review foundAfterDelete = reviewService.getReviewByID(testReviewId);

        System.out.println("\n=== SERVICE READ REVIEW SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con reviews_id = " + testReviewId);
        } else {
            System.out.println("Van con review: " + foundAfterDelete);
        }
    }
}