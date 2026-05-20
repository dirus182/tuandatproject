package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Customer;

public class CustomerService {

	private ArrayList<Customer> customerlist = new ArrayList<Customer>();

	// C - Create
	public void addCustomer(Customer customer) {
		customerlist.add(customer);
	}

	// R - Read all
	public ArrayList<Customer> getAllCustomers() {
		return customerlist;
	}

	// R - Read by customer_id
	public Customer getCustomerByID(Integer customer_id) {
		for (Customer customer : customerlist) {
			if (customer.getCustomer_id().equals(customer_id)) {
				return customer;
			}
		}
		return null;
	}

	// U - Update
	public boolean updateCustomer(Integer customer_id, Customer newCustomer) {
		for (Customer customer : customerlist) {
			if (customer.getCustomer_id().equals(customer_id)) {
				customer.setPhone_number(newCustomer.getPhone_number());
				customer.setFirst_name(newCustomer.getFirst_name());
				customer.setLast_name(newCustomer.getLast_name());
				customer.setCustomer_email(newCustomer.getCustomer_email());
				customer.setAddress_id(newCustomer.getAddress_id());
				return true;
			}
		}
		return false;
	}

	// D - Delete
	public boolean deleteCustomer(Integer customer_id) {
		for (int i = 0; i < customerlist.size(); i++) {
			if (customerlist.get(i).getCustomer_id().equals(customer_id)) {
				customerlist.remove(i);
				return true;
			}
		}
		return false;
	}
}