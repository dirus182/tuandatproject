package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Review;

public class ReviewService {
	private ArrayList<Review> reviewlist = new ArrayList<Review>();

	// C
	public void addReview(Review review) {
		reviewlist.add(review);
	}

	// R ALL
	public ArrayList<Review> getAllReviews() {
		return reviewlist;
	}

// R BY ID
	public Review getReviewBYID(Integer reviews_id) {
		for (Review review : reviewlist) {
			if (review.getReviews_id().equals(reviews_id)) {
				return review;
			}
		}
		return null;
	}

	// U
	public boolean updateReview(Integer reviews_id, Review newReview) {
		for (Review review : reviewlist) {
			if (review.getReviews_id().equals(reviews_id)) {
				review.setOrder_detail_id(newReview.getOrder_detail_id());
				review.setCreate_at(newReview.getCreate_at());
				review.setCustomer_comment(newReview.getCustomer_comment());
				review.setRating(newReview.getRating());
				return true;
			}
		}
		return false;
	}

	// D
	public boolean deleteReview(Integer reviews_id) {
		for (int i = 0; i < reviewlist.size(); i++) {
			reviewlist.remove(i);
			return true;
		}
		return false;
	}
}
