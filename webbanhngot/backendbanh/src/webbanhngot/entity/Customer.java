package webbanhngot.entity;

public class Customer {

	private Integer customer_id;
	private String phone_number;
	private String first_name;
	private String last_name;
	private String customer_email;
	private String address_id;

	public Customer() {
	}

	public Customer(Integer customer_id, String phone_number, String first_name, String last_name,
			String customer_email, String address_id) {
		this.customer_id = customer_id;
		this.phone_number = phone_number;
		this.first_name = first_name;
		this.last_name = last_name;
		this.customer_email = customer_email;
		this.address_id = address_id;
	}

	public Integer getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Integer customer_id) {
		this.customer_id = customer_id;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getCustomer_email() {
		return customer_email;
	}

	public void setCustomer_email(String customer_email) {
		this.customer_email = customer_email;
	}

	public String getAddress_id() {
		return address_id;
	}

	public void setAddress_id(String address_id) {
		this.address_id = address_id;
	}

	@Override
	public String toString() {
		return "Customer [customer_id=" + customer_id + ", phone_number=" + phone_number + ", first_name=" + first_name
				+ ", last_name=" + last_name + ", customer_email=" + customer_email + ", address_id=" + address_id
				+ "]";
	}
}