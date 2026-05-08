package webbanhngot.entity;

import java.time.LocalDateTime;

public class Review {
	private Integer reviews_id;
	private Integer order_detail_id;
	private LocalDateTime created_at;
	private String customer_comment;
	private Integer rating;

	public Review() {
	}

	public Review(Integer reviews_id, Integer order_detail_id, LocalDateTime create_at, String customer_comment,
			Integer rating) {
		super();
		this.reviews_id = reviews_id;
		this.order_detail_id = order_detail_id;
		this.created_at = create_at;
		this.customer_comment = customer_comment;
		this.rating = rating;
	}

	public Integer getReviews_id() {
		return reviews_id;
	}

	public void setReviews_id(Integer reviews_id) {
		this.reviews_id = reviews_id;
	}

	public Integer getOrder_detail_id() {
		return order_detail_id;
	}

	public void setOrder_detail_id(Integer order_detail_id) {
		this.order_detail_id = order_detail_id;
	}

	public LocalDateTime getCreate_at() {
		return created_at;
	}

	public void setCreate_at(LocalDateTime create_at) {
		this.created_at = create_at;
	}

	public String getCustomer_comment() {
		return customer_comment;
	}

	public void setCustomer_comment(String customer_comment) {
		this.customer_comment = customer_comment;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "Review [reviews_id=" + reviews_id + ", order_detail_id=" + order_detail_id + ", created_at="
				+ created_at + ", customer_comment=" + customer_comment + ", rating=" + rating + "]";
	}

}
