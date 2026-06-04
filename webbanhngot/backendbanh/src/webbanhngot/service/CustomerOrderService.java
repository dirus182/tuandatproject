package webbanhngot.service;

import java.math.BigDecimal;
import java.util.ArrayList;

import webbanhngot.entity.CustomerOrder;
import webbanhngot.repository.CustomerOrderRepository;
import webbanhngot.repository.OrderDetailRepository;
import webbanhngot.repository.PaymentRepository;
import webbanhngot.repository.ReviewRepository;

public class CustomerOrderService {

    private CustomerOrderRepository customerOrderRepository = new CustomerOrderRepository();
    private PaymentRepository paymentRepository = new PaymentRepository();
    private OrderDetailRepository orderDetailRepository = new OrderDetailRepository();
    private ReviewRepository reviewRepository = new ReviewRepository();

    // C - Create
    public boolean addCustomerOrder(CustomerOrder customerOrder) {
        if (!isValidCustomerOrder(customerOrder)) {
            return false;
        }

        CustomerOrder existingOrder = customerOrderRepository.getCustomerOrderByID(customerOrder.getOrder_id());

        if (existingOrder != null) {
            return false;
        }

        return customerOrderRepository.addCustomerOrder(customerOrder);
    }

    // R - Read all
    public ArrayList<CustomerOrder> getAllCustomerOrders() {
        return customerOrderRepository.getAllCustomerOrders();
    }

    // R - Read by ID
    public CustomerOrder getCustomerOrderByID(Integer order_id) {
        if (order_id == null) {
            return null;
        }

        return customerOrderRepository.getCustomerOrderByID(order_id);
    }

    // U - Update
    public boolean updateCustomerOrder(Integer order_id, CustomerOrder newCustomerOrder) {
        if (order_id == null || !isValidCustomerOrder(newCustomerOrder)) {
            return false;
        }

        CustomerOrder existingOrder = customerOrderRepository.getCustomerOrderByID(order_id);

        if (existingOrder == null) {
            return false;
        }

        return customerOrderRepository.updateCustomerOrder(order_id, newCustomerOrder);
    }

    // D - Delete
    public boolean deleteCustomerOrder(Integer order_id) {
        if (order_id == null) {
            return false;
        }

        CustomerOrder existingOrder = customerOrderRepository.getCustomerOrderByID(order_id);

        if (existingOrder == null) {
            return false;
        }

        // 1. Xoa review truoc vi review phu thuoc vao orderdetail
        boolean deleteReviewResult = reviewRepository.deleteReviewsByOrderID(order_id);

        if (!deleteReviewResult) {
            return false;
        }

        // 2. Xoa orderdetail sau khi review da duoc xoa
        boolean deleteOrderDetailResult = orderDetailRepository.deleteOrderDetailsByOrderID(order_id);

        if (!deleteOrderDetailResult) {
            return false;
        }

        // 3. Xoa payment phu thuoc vao customerorder
        boolean deletePaymentResult = paymentRepository.deletePaymentsByOrderID(order_id);

        if (!deletePaymentResult) {
            return false;
        }

        // 4. Cuoi cung moi xoa customerorder
        return customerOrderRepository.deleteCustomerOrder(order_id);
    }

    private boolean isValidCustomerOrder(CustomerOrder customerOrder) {
        if (customerOrder == null) {
            return false;
        }

        if (customerOrder.getOrder_id() == null || customerOrder.getOrder_id() <= 0) {
            return false;
        }

        if (customerOrder.getCustomer_id() == null || customerOrder.getCustomer_id() <= 0) {
            return false;
        }

        if (customerOrder.getStatus() == null || customerOrder.getStatus().isBlank()) {
            return false;
        }

        if (!isValidStatus(customerOrder.getStatus())) {
            return false;
        }

        if (customerOrder.getOrder_date() == null) {
            return false;
        }

        if (customerOrder.getTotal_price() == null ||
                customerOrder.getTotal_price().compareTo(BigDecimal.ZERO) < 0) {
            return false;
        }

        return true;
    }

    private boolean isValidStatus(String status) {
        return status.equals("pending")
                || status.equals("shipped")
                || status.equals("canceled");
    }
}