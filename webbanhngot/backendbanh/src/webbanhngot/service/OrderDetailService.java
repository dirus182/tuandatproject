package webbanhngot.service;

import java.math.BigDecimal;
import java.util.ArrayList;

import webbanhngot.entity.OrderDetail;
import webbanhngot.repository.OrderDetailRepository;
import webbanhngot.repository.ReviewRepository;

public class OrderDetailService {

    private OrderDetailRepository orderDetailRepository = new OrderDetailRepository();
    private ReviewRepository reviewRepository = new ReviewRepository();

    // C - Create
    public boolean addOrderDetail(OrderDetail orderDetail) {
        if (!isValidOrderDetail(orderDetail)) {
            return false;
        }

        OrderDetail existingOrderDetail = orderDetailRepository.getOrderDetailByID(orderDetail.getOrder_detail_id());

        if (existingOrderDetail != null) {
            return false;
        }

        return orderDetailRepository.addOrderDetail(orderDetail);
    }

    // R - Read all
    public ArrayList<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.getAllOrderDetails();
    }

    // R - Read by ID
    public OrderDetail getOrderDetailByID(Integer order_detail_id) {
        if (order_detail_id == null) {
            return null;
        }

        return orderDetailRepository.getOrderDetailByID(order_detail_id);
    }

    // U - Update
    public boolean updateOrderDetail(Integer order_detail_id, OrderDetail newOrderDetail) {
        if (order_detail_id == null || !isValidOrderDetail(newOrderDetail)) {
            return false;
        }

        OrderDetail existingOrderDetail = orderDetailRepository.getOrderDetailByID(order_detail_id);

        if (existingOrderDetail == null) {
            return false;
        }

        return orderDetailRepository.updateOrderDetail(order_detail_id, newOrderDetail);
    }

    // D - Delete
    public boolean deleteOrderDetail(Integer order_detail_id) {
        if (order_detail_id == null) {
            return false;
        }

        OrderDetail existingOrderDetail = orderDetailRepository.getOrderDetailByID(order_detail_id);

        if (existingOrderDetail == null) {
            return false;
        }

        // Xoa review phu thuoc truoc
        boolean deleteReviewResult = reviewRepository.deleteReviewsByOrderDetailID(order_detail_id);

        if (!deleteReviewResult) {
            return false;
        }

        // Sau do moi xoa orderdetail
        return orderDetailRepository.deleteOrderDetail(order_detail_id);
    }

    private boolean isValidOrderDetail(OrderDetail orderDetail) {
        if (orderDetail == null) {
            return false;
        }

        if (orderDetail.getOrder_detail_id() == null || orderDetail.getOrder_detail_id() <= 0) {
            return false;
        }

        if (orderDetail.getOrder_id() == null || orderDetail.getOrder_id() <= 0) {
            return false;
        }

        if (orderDetail.getCake_id() == null || orderDetail.getCake_id() <= 0) {
            return false;
        }

        if (orderDetail.getQuantity() == null || orderDetail.getQuantity() <= 0) {
            return false;
        }

        if (orderDetail.getSub_total() == null ||
                orderDetail.getSub_total().compareTo(BigDecimal.ZERO) < 0) {
            return false;
        }

        return true;
    }
}