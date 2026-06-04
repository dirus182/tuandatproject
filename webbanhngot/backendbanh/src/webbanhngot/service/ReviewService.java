package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Review;
import webbanhngot.repository.ReviewRepository;

public class ReviewService {

    private ReviewRepository reviewRepository = new ReviewRepository();

    // C - Create
    public boolean addReview(Review review) {
        if (!isValidReview(review)) {
            return false;
        }

        Review existingReview = reviewRepository.getReviewByID(review.getReviews_id());

        if (existingReview != null) {
            return false;
        }

        return reviewRepository.addReview(review);
    }

    // R - Read all
    public ArrayList<Review> getAllReviews() {
        return reviewRepository.getAllReviews();
    }

    // R - Read by reviews_id
    public Review getReviewByID(Integer reviews_id) {
        if (reviews_id == null) {
            return null;
        }

        return reviewRepository.getReviewByID(reviews_id);
    }

    // U - Update
    public boolean updateReview(Integer reviews_id, Review newReview) {
        if (reviews_id == null || !isValidReview(newReview)) {
            return false;
        }

        Review existingReview = reviewRepository.getReviewByID(reviews_id);

        if (existingReview == null) {
            return false;
        }

        return reviewRepository.updateReview(reviews_id, newReview);
    }

    // D - Delete
    public boolean deleteReview(Integer reviews_id) {
        if (reviews_id == null) {
            return false;
        }

        Review existingReview = reviewRepository.getReviewByID(reviews_id);

        if (existingReview == null) {
            return false;
        }

        return reviewRepository.deleteReview(reviews_id);
    }

    private boolean isValidReview(Review review) {
        if (review == null) {
            return false;
        }

        if (review.getReviews_id() == null || review.getReviews_id() <= 0) {
            return false;
        }

        if (review.getOrder_detail_id() == null || review.getOrder_detail_id() <= 0) {
            return false;
        }

        if (review.getCreate_at() == null) {
            return false;
        }

        if (review.getCustomer_comment() == null || review.getCustomer_comment().isBlank()) {
            return false;
        }

        if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5) {
            return false;
        }

        return true;
    }
}