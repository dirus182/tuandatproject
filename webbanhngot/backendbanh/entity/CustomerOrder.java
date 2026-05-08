package webbanhngot.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CustomerOrder {
	private Integer order_id;
	private Integer customer_id;
	private String status;
	private LocalDateTime order_date;
	private BigDecimal total_price;

	public CustomerOrder() {

	}

	public CustomerOrder(Integer order_id, Integer customer_id, String status, LocalDateTime order_date,
			BigDecimal total_price) {
		super();
		this.order_id = order_id;
		this.customer_id = customer_id;
		this.status = status;
		this.order_date = order_date;
		this.total_price = total_price;
	}

	public Integer getOrder_id() {
		return order_id;
	}

	public void setOrder_id(Integer order_id) {
		this.order_id = order_id;
	}

	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getOrder_date() {
		return order_date;
	}

	public void setOrder_date(LocalDateTime order_date) {
		this.order_date = order_date;
	}

	public BigDecimal getTotal_price() {
		return total_price;
	}

	public void setTotal_price(BigDecimal total_price) {
		this.total_price = total_price;
	}

	@Override
	public String toString() {
		return "CustomerOrder [order_id=" + order_id + ", customer_id=" + customer_id + ", status=" + status
				+ ", order_date=" + order_date + ", total_price=" + total_price + "]";
	}

}
