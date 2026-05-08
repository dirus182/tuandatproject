package webbanhngot.entity;

import java.math.BigDecimal;

public class OrderDetail {
	private Integer order_detail_id;
	private Integer order_id;
	private Integer cake_id;
	private Integer quantity;
	private BigDecimal sub_total;

	public OrderDetail() {

	}

	public OrderDetail(Integer order_detail_id, Integer order_id, Integer cake_id, Integer quantity,
			BigDecimal sub_total) {
		super();
		this.order_detail_id = order_detail_id;
		this.order_id = order_id;
		this.cake_id = cake_id;
		this.quantity = quantity;
		this.sub_total = sub_total;
	}

	public Integer getOrder_detail_id() {
		return order_detail_id;
	}

	public void setOrder_detail_id(Integer order_detail_id) {
		this.order_detail_id = order_detail_id;
	}

	public Integer getOrder_id() {
		return order_id;
	}

	public void setOrder_id(Integer order_id) {
		this.order_id = order_id;
	}

	public Integer getCake_id() {
		return cake_id;
	}

	public void setCake_id(Integer cake_id) {
		this.cake_id = cake_id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getSub_total() {
		return sub_total;
	}

	public void setSub_total(BigDecimal sub_total) {
		this.sub_total = sub_total;
	}

	@Override
	public String toString() {
		return "OrderDetail [order_detail_id=" + order_detail_id + ", order_id=" + order_id + ", cake_id=" + cake_id
				+ ", quantity=" + quantity + ", sub_total=" + sub_total + "]";
	}

}
