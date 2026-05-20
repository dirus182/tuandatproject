package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Review;

public class ReviewService {

	private ArrayList<Review> reviewlist = new ArrayList<Review>();

	// C - Create
	public void addReview(Review review) {
		reviewlist.add(review);
	}

	// R - Read all
	public ArrayList<Review> getAllReviews() {
		return reviewlist;
	}

	// R - Read by reviews_id
	public Review getReviewByID(Integer reviews_id) {
		for (Review review : reviewlist) {
			if (review.getReviews_id().equals(reviews_id)) {
				return review;
			}
		}
		return null;
	}

	// U - Update
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

	// D - Delete
	public boolean deleteReview(Integer reviews_id) {
		for (int i = 0; i < reviewlist.size(); i++) {
			if (reviewlist.get(i).getReviews_id().equals(reviews_id)) {
				reviewlist.remove(i);
				return true;
			}
		}
		return false;
	}
}