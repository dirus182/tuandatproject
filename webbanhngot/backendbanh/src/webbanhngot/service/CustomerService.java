package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Customer;
import webbanhngot.entity.CustomerOrder;
import webbanhngot.repository.CustomerRepository;
import webbanhngot.repository.CustomerOrderRepository;

public class CustomerService {

    private CustomerRepository customerRepository = new CustomerRepository();
    private CustomerOrderRepository customerOrderRepository = new CustomerOrderRepository();
    private CustomerOrderService customerOrderService = new CustomerOrderService();

    // C - Create
    public boolean addCustomer(Customer customer) {
        if (!isValidCustomer(customer)) {
            return false;
        }

        Customer existingCustomer = customerRepository.getCustomerByID(customer.getCustomer_id());

        if (existingCustomer != null) {
            return false;
        }

        return customerRepository.addCustomer(customer);
    }

    // R - Read all
    public ArrayList<Customer> getAllCustomers() {
        return customerRepository.getAllCustomers();
    }

    // R - Read by ID
    public Customer getCustomerByID(Integer customer_id) {
        if (customer_id == null) {
            return null;
        }

        return customerRepository.getCustomerByID(customer_id);
    }

    // U - Update
    public boolean updateCustomer(Integer customer_id, Customer newCustomer) {
        if (customer_id == null || !isValidCustomer(newCustomer)) {
            return false;
        }

        Customer existingCustomer = customerRepository.getCustomerByID(customer_id);

        if (existingCustomer == null) {
            return false;
        }

        return customerRepository.updateCustomer(customer_id, newCustomer);
    }

    // D - Delete
    public boolean deleteCustomer(Integer customer_id) {
        if (customer_id == null) {
            return false;
        }

        Customer existingCustomer = customerRepository.getCustomerByID(customer_id);

        if (existingCustomer == null) {
            return false;
        }

        ArrayList<CustomerOrder> customerOrders = customerOrderRepository.getCustomerOrdersByCustomerID(customer_id);

        for (CustomerOrder customerOrder : customerOrders) {
            boolean deleteOrderResult = customerOrderService.deleteCustomerOrder(customerOrder.getOrder_id());

            if (!deleteOrderResult) {
                return false;
            }
        }

        return customerRepository.deleteCustomer(customer_id);
    }

    private boolean isValidCustomer(Customer customer) {
        if (customer == null) {
            return false;
        }

        if (customer.getCustomer_id() == null || customer.getCustomer_id() <= 0) {
            return false;
        }

        if (customer.getPhone_number() == null || customer.getPhone_number().isBlank()) {
            return false;
        }

        if (customer.getFirst_name() == null || customer.getFirst_name().isBlank()) {
            return false;
        }

        if (customer.getLast_name() == null || customer.getLast_name().isBlank()) {
            return false;
        }

        if (customer.getCustomer_email() == null || customer.getCustomer_email().isBlank()) {
            return false;
        }

        if (customer.getAddress_id() == null || customer.getAddress_id().isBlank()) {
            return false;
        }

        return true;
    }
}