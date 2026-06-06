package com.webbanhngot.backendbanh.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

import com.webbanhngot.backendbanh.entity.Review;
import com.webbanhngot.backendbanh.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService = new ReviewService();

    @GetMapping
    public ArrayList<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable("id") Integer reviewId) {
        return reviewService.getReviewByID(reviewId);
    }

    @PostMapping
    public boolean createReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @PutMapping("/{id}")
    public boolean updateReview(@PathVariable("id") Integer reviewId,
                                @RequestBody Review updatedReview) {
        return reviewService.updateReview(reviewId, updatedReview);
    }

    @DeleteMapping("/{id}")
    public boolean deleteReview(@PathVariable("id") Integer reviewId) {
        return reviewService.deleteReview(reviewId);
    }
}