package webbanhngot.app;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import webbanhngot.entity.CustomerOrder;
import webbanhngot.entity.OrderDetail;
import webbanhngot.entity.Payment;
import webbanhngot.entity.Review;
import webbanhngot.repository.OrderDetailRepository;
import webbanhngot.repository.PaymentRepository;
import webbanhngot.repository.ReviewRepository;
import webbanhngot.service.CustomerOrderService;

public class MainTest {
    public static void main(String[] args) {
        CustomerOrderService customerOrderService = new CustomerOrderService();
        OrderDetailRepository orderDetailRepository = new OrderDetailRepository();
        ReviewRepository reviewRepository = new ReviewRepository();
        PaymentRepository paymentRepository = new PaymentRepository();

        Integer testOrderId = 9999;
        Integer testOrderDetailId = 9999;
        Integer testReviewId = 9999;
        Integer testPaymentId = 9999;

        // Don rac test cu neu co
        customerOrderService.deleteCustomerOrder(testOrderId);

        // 1. Tao customer order
        CustomerOrder order = new CustomerOrder();
        order.setOrder_id(testOrderId);
        order.setCustomer_id(5);
        order.setStatus("pending");
        order.setOrder_date(LocalDateTime.now());
        order.setTotal_price(new BigDecimal("99.99"));

        boolean addOrderResult = customerOrderService.addCustomerOrder(order);

        System.out.println("=== INSERT CUSTOMER ORDER ===");
        System.out.println("Them order thanh cong khong? " + addOrderResult);

        // 2. Tao order detail con cua order
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder_detail_id(testOrderDetailId);
        orderDetail.setOrder_id(testOrderId);
        orderDetail.setCake_id(1);
        orderDetail.setQuantity(2);
        orderDetail.setSub_total(new BigDecimal("11.98"));

        boolean addOrderDetailResult = orderDetailRepository.addOrderDetail(orderDetail);

        System.out.println("\n=== INSERT ORDER DETAIL ===");
        System.out.println("Them order detail thanh cong khong? " + addOrderDetailResult);

        // 3. Tao review con cua order detail
        Review review = new Review();
        review.setReviews_id(testReviewId);
        review.setOrder_detail_id(testOrderDetailId);
        review.setCreate_at(LocalDateTime.now());
        review.setCustomer_comment("Test review before delete order");
        review.setRating(5);

        boolean addReviewResult = reviewRepository.addReview(review);

        System.out.println("\n=== INSERT REVIEW ===");
        System.out.println("Them review thanh cong khong? " + addReviewResult);

        // 4. Tao payment con cua order
        Payment payment = new Payment();
        payment.setPayment_id(testPaymentId);
        payment.setOrder_id(testOrderId);
        payment.setPayment_method("cash");
        payment.setPayment_status("pending");
        payment.setPayment_date(LocalDateTime.now());

        boolean addPaymentResult = paymentRepository.addPayment(payment);

        System.out.println("\n=== INSERT PAYMENT ===");
        System.out.println("Them payment thanh cong khong? " + addPaymentResult);

        // 5. Xoa order bang CustomerOrderService
        boolean deleteOrderResult = customerOrderService.deleteCustomerOrder(testOrderId);

        System.out.println("\n=== DELETE CUSTOMER ORDER WITH CHILDREN ===");
        System.out.println("Xoa order kem bang con thanh cong khong? " + deleteOrderResult);

        // 6. Check lai
        CustomerOrder foundOrder = customerOrderService.getCustomerOrderByID(testOrderId);
        OrderDetail foundOrderDetail = orderDetailRepository.getOrderDetailByID(testOrderDetailId);
        Review foundReview = reviewRepository.getReviewByID(testReviewId);
        Payment foundPayment = paymentRepository.getPaymentByID(testPaymentId);

        System.out.println("\n=== CHECK SAU DELETE ===");
        System.out.println("Order con khong? " + (foundOrder != null));
        System.out.println("OrderDetail con khong? " + (foundOrderDetail != null));
        System.out.println("Review con khong? " + (foundReview != null));
        System.out.println("Payment con khong? " + (foundPayment != null));
    }
}