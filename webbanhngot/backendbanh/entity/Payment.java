package webbanhngot.entity;

import java.time.LocalDateTime;

public class Payment {
	private Integer payment_id;
	private Integer order_id;
	private String payment_method;
	private String payment_status;
	private LocalDateTime payment_date;

	public Payment() {

	}

	public Payment(Integer payment_id, Integer order_id, String payment_method, String payment_status,
			LocalDateTime payment_date) {
		super();
		this.payment_id = payment_id;
		this.order_id = order_id;
		this.payment_method = payment_method;
		this.payment_status = payment_status;
		this.payment_date = payment_date;
	}

	public Integer getPayment_id() {
		return payment_id;
	}

	public void setPayment_id(Integer payment_id) {
		this.payment_id = payment_id;
	}

	public Integer getOrder_id() {
		return order_id;
	}

	public void setOrder_id(Integer order_id) {
		this.order_id = order_id;
	}

	public String getPayment_method() {
		return payment_method;
	}

	public void setPayment_method(String payment_method) {
		this.payment_method = payment_method;
	}

	public String getPayment_status() {
		return payment_status;
	}

	public void setPayment_status(String payment_status) {
		this.payment_status = payment_status;
	}

	public LocalDateTime getPayment_date() {
		return payment_date;
	}

	public void setPayment_date(LocalDateTime payment_date) {
		this.payment_date = payment_date;
	}

	@Override
	public String toString() {
		return "Payment [payment_id=" + payment_id + ", order_id=" + order_id + ", payment_method=" + payment_method
				+ ", payment_status=" + payment_status + ", payment_date=" + payment_date + "]";
	}

}