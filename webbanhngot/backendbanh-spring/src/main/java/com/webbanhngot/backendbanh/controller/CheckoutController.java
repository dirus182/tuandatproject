package com.webbanhngot.backendbanh.controller;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.webbanhngot.backendbanh.db.DBConnection;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @PostMapping
    public CheckoutResponse createCheckout(@RequestBody CheckoutRequest request) {
        try {
            validateRequest(request);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }

        try (Connection connection = DBConnection.getConnection()) {
            connection.setAutoCommit(false);

            try {
                Integer customerId = createCustomer(connection, request.customer);
                Integer orderId = createOrder(connection, customerId, request.totalPrice);
                List<Integer> orderDetailIds = createOrderDetails(connection, orderId, request.items);
                updateOrderTotal(connection, orderId, request.totalPrice);
                updatePaymentMethod(connection, orderId, request.paymentMethod);

                connection.commit();

                CheckoutResponse response = new CheckoutResponse();
                response.customerId = customerId;
                response.orderId = orderId;
                response.orderDetailIds = orderDetailIds;
                response.paymentMethod = normalizePaymentMethod(request.paymentMethod);
                response.totalPrice = request.totalPrice;
                response.message = "Checkout created successfully";
                return response;
            } catch (SQLException | RuntimeException e) {
                connection.rollback();
                throw e;
            } finally {
                connection.setAutoCommit(true);
            }
        } catch (SQLException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Checkout could not be created", e);
        }
    }

    private Integer createCustomer(Connection connection, CheckoutCustomer customer) throws SQLException {
        String sql = "INSERT INTO customer (phone_number, first_name, last_name, customer_email, address_id) "
                + "VALUES (?, ?, ?, ?, ?) RETURNING customer_id";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, customer.phoneNumber);
            statement.setString(2, customer.firstName);
            statement.setString(3, customer.lastName);
            statement.setString(4, customer.email);
            statement.setString(5, customer.address);

            try (ResultSet resultSet = statement.executeQuery()) {
                resultSet.next();
                return resultSet.getInt("customer_id");
            }
        }
    }

    private Integer createOrder(Connection connection, Integer customerId, BigDecimal totalPrice) throws SQLException {
        String sql = "INSERT INTO customerorder (customer_id, status, order_date, total_price) "
                + "VALUES (?, 'pending', NOW(), ?) RETURNING order_id";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setInt(1, customerId);
            statement.setBigDecimal(2, totalPrice);

            try (ResultSet resultSet = statement.executeQuery()) {
                resultSet.next();
                return resultSet.getInt("order_id");
            }
        }
    }

    private List<Integer> createOrderDetails(Connection connection, Integer orderId, List<CheckoutItem> items)
            throws SQLException {
        List<Integer> orderDetailIds = new ArrayList<>();
        String sql = "INSERT INTO orderdetail (order_id, cake_id, quantity, sub_total) "
                + "VALUES (?, ?, ?, ?) RETURNING order_detail_id";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            for (CheckoutItem item : items) {
                statement.setInt(1, orderId);
                statement.setInt(2, item.cakeId);
                statement.setInt(3, item.quantity);
                statement.setBigDecimal(4, item.subTotal);

                try (ResultSet resultSet = statement.executeQuery()) {
                    resultSet.next();
                    orderDetailIds.add(resultSet.getInt("order_detail_id"));
                }
            }
        }

        return orderDetailIds;
    }

    private void updateOrderTotal(Connection connection, Integer orderId, BigDecimal totalPrice) throws SQLException {
        String sql = "UPDATE customerorder SET total_price = ? WHERE order_id = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setBigDecimal(1, totalPrice);
            statement.setInt(2, orderId);
            statement.executeUpdate();
        }
    }

    private void updatePaymentMethod(Connection connection, Integer orderId, String paymentMethod) throws SQLException {
        String sql = "UPDATE payment SET payment_method = ? WHERE order_id = ?";

        try (PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, normalizePaymentMethod(paymentMethod));
            statement.setInt(2, orderId);
            statement.executeUpdate();
        }
    }

    private String normalizePaymentMethod(String paymentMethod) {
        if (paymentMethod == null || paymentMethod.isBlank()) {
            return "cash";
        }

        return paymentMethod;
    }

    private void validateRequest(CheckoutRequest request) {
        if (request == null || request.customer == null || request.items == null || request.items.isEmpty()) {
            throw new IllegalArgumentException("Checkout request is missing customer or cart items");
        }

        if (request.totalPrice == null || request.totalPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Checkout total must be greater than zero");
        }

        for (CheckoutItem item : request.items) {
            if (item.cakeId == null || item.cakeId <= 0 || item.quantity == null || item.quantity <= 0
                    || item.subTotal == null || item.subTotal.compareTo(BigDecimal.ZERO) < 0) {
                throw new IllegalArgumentException("Checkout contains an invalid cart item");
            }
        }
    }

    public static class CheckoutRequest {
        public CheckoutCustomer customer;
        public List<CheckoutItem> items;
        public BigDecimal totalPrice;
        public String paymentMethod;
    }

    public static class CheckoutCustomer {
        public String firstName;
        public String lastName;
        public String email;
        public String phoneNumber;
        public String address;
    }

    public static class CheckoutItem {
        public Integer cakeId;
        public Integer quantity;
        public BigDecimal subTotal;
    }

    public static class CheckoutResponse {
        public Integer customerId;
        public Integer orderId;
        public List<Integer> orderDetailIds;
        public BigDecimal totalPrice;
        public String paymentMethod;
        public String message;
    }
}
