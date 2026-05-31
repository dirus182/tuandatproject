package com.com.webbanhngot.backendbackendbanh.repository;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import com.com.webbanhngot.backendbackendbanh.db.DBConnection;
import com.com.webbanhngot.backendbackendbanh.entity.CustomerOrder;

public class CustomerOrderRepository {

    public ArrayList<CustomerOrder> getAllCustomerOrders() {
        ArrayList<CustomerOrder> customerOrderList = new ArrayList<CustomerOrder>();

        String sql = "SELECT order_id, customer_id, status, order_date, total_price "
                + "FROM customerorder "
                + "ORDER BY order_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                CustomerOrder customerOrder = mapResultSetToCustomerOrder(resultSet);
                customerOrderList.add(customerOrder);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return customerOrderList;
    }

    public CustomerOrder getCustomerOrderByID(Integer order_id) {
        String sql = "SELECT order_id, customer_id, status, order_date, total_price "
                + "FROM customerorder "
                + "WHERE order_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, order_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToCustomerOrder(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
public ArrayList<CustomerOrder> getCustomerOrdersByCustomerID(Integer customer_id) {
    ArrayList<CustomerOrder> customerOrderList = new ArrayList<CustomerOrder>();

    String sql = "SELECT order_id, customer_id, status, order_date, total_price "
            + "FROM customerorder "
            + "WHERE customer_id = ? "
            + "ORDER BY order_id";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, customer_id);

        try (ResultSet resultSet = statement.executeQuery()) {
            while (resultSet.next()) {
                CustomerOrder customerOrder = mapResultSetToCustomerOrder(resultSet);
                customerOrderList.add(customerOrder);
            }
        }

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return customerOrderList;
}
    public boolean addCustomerOrder(CustomerOrder customerOrder) {
        String sql = "INSERT INTO customerorder "
                + "(order_id, customer_id, status, order_date, total_price) "
                + "VALUES (?, ?, ?, ?, ?)";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, customerOrder.getOrder_id());
            statement.setInt(2, customerOrder.getCustomer_id());
            statement.setString(3, customerOrder.getStatus());

            if (customerOrder.getOrder_date() != null) {
                statement.setTimestamp(4, Timestamp.valueOf(customerOrder.getOrder_date()));
            } else {
                statement.setTimestamp(4, null);
            }

            statement.setBigDecimal(5, customerOrder.getTotal_price());

            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean updateCustomerOrder(Integer order_id, CustomerOrder customerOrder) {
        String sql = "UPDATE customerorder "
                + "SET customer_id = ?, status = ?, order_date = ?, total_price = ? "
                + "WHERE order_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, customerOrder.getCustomer_id());
            statement.setString(2, customerOrder.getStatus());

            if (customerOrder.getOrder_date() != null) {
                statement.setTimestamp(3, Timestamp.valueOf(customerOrder.getOrder_date()));
            } else {
                statement.setTimestamp(3, null);
            }

            statement.setBigDecimal(4, customerOrder.getTotal_price());
            statement.setInt(5, order_id);

            int rowsUpdated = statement.executeUpdate();
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteCustomerOrder(Integer order_id) {
        String sql = "DELETE FROM customerorder WHERE order_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, order_id);

            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    private CustomerOrder mapResultSetToCustomerOrder(ResultSet resultSet) throws SQLException {
        CustomerOrder customerOrder = new CustomerOrder();

        customerOrder.setOrder_id(resultSet.getInt("order_id"));
        customerOrder.setCustomer_id(resultSet.getInt("customer_id"));
        customerOrder.setStatus(resultSet.getString("status"));

        Timestamp orderDate = resultSet.getTimestamp("order_date");
        if (orderDate != null) {
            customerOrder.setOrder_date(orderDate.toLocalDateTime());
        }

        BigDecimal totalPrice = resultSet.getBigDecimal("total_price");
        customerOrder.setTotal_price(totalPrice);

        return customerOrder;
    }
}
/*
Xóa payment:
payment

Xóa orderdetail:
review → orderdetail

Xóa customerorder:
review → orderdetail → payment → customerorder */