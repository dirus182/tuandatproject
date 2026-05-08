package webbanhngot.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class Product {
	private Long cake_id;
	private Long option_cake_id;
	private Integer quantity;
	private BigDecimal price;
	private String[] description;
	private String cake_name;
	private LocalDateTime create_at;

	public Product() {
	}

	public Product(Long cake_id, Long option_cake_id, Integer quantity, BigDecimal price, String[] description,
			String cake_name, LocalDateTime create_at) {
		this.cake_id = cake_id;
		this.option_cake_id = option_cake_id;
		this.quantity = quantity;
		this.price = price;
		this.description = description;
		this.cake_name = cake_name;
		this.create_at = create_at;
	}

	@Override
	public String toString() {
		return "Product [cake_id=" + cake_id + ", option_cake_id=" + option_cake_id + ", quantity=" + quantity
				+ ", price=" + price + ", cake_name=" + cake_name + ", create_at=" + create_at + "]";
	}

	public Long getCake_id() {
		return cake_id;
	}

	public void setCake_id(Long cake_id) {
		this.cake_id = cake_id;
	}

	public Long getOption_cake_id() {
		return option_cake_id;
	}

	public void setOption_cake_id(Long option_cake_id) {
		this.option_cake_id = option_cake_id;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String[] getDescription() {
		return description;
	}

	public void setDescription(String[] description) {
		this.description = description;
	}

	public String getCake_name() {
		return cake_name;
	}

	public void setCake_name(String cake_name) {
		this.cake_name = cake_name;
	}

	public LocalDateTime getCreate_at() {
		return create_at;
	}

	public void setCreate_at(LocalDateTime create_at) {
		this.create_at = create_at;
	}

}