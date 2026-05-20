package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.CustomerOrder;

public class CustomerOrderService {

	private ArrayList<CustomerOrder> customerorderlist = new ArrayList<CustomerOrder>();

	// C - Create
	public void addCustomerOrder(CustomerOrder customerOrder) {
		customerorderlist.add(customerOrder);
	}

	// R - Read all
	public ArrayList<CustomerOrder> getAllCustomerOrders() {
		return customerorderlist;
	}

	// R - Read by order_id
	public CustomerOrder getCustomerOrderByID(Integer order_id) {
		for (CustomerOrder customerOrder : customerorderlist) {
			if (customerOrder.getOrder_id().equals(order_id)) {
				return customerOrder;
			}
		}
		return null;
	}

	// U - Update
	public boolean updateCustomerOrder(Integer order_id, CustomerOrder newCustomerOrder) {
		for (CustomerOrder customerOrder : customerorderlist) {
			if (customerOrder.getOrder_id().equals(order_id)) {
				customerOrder.setCustomer_id(newCustomerOrder.getCustomer_id());
				customerOrder.setStatus(newCustomerOrder.getStatus());
				customerOrder.setOrder_date(newCustomerOrder.getOrder_date());
				customerOrder.setTotal_price(newCustomerOrder.getTotal_price());
				return true;
			}
		}
		return false;
	}

	// D - Delete
	public boolean deleteCustomerOrder(Integer order_id) {
		for (int i = 0; i < customerorderlist.size(); i++) {
			if (customerorderlist.get(i).getOrder_id().equals(order_id)) {
				customerorderlist.remove(i);
				return true;
			}
		}
		return false;
	}
}