package com.webbanhngot.backendbanh.repository;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.webbanhngot.backendbanh.db.DBConnection;
import com.webbanhngot.backendbanh.entity.OrderDetail;

public class OrderDetailRepository {

    public ArrayList<OrderDetail> getAllOrderDetails() {
        ArrayList<OrderDetail> orderDetailList = new ArrayList<OrderDetail>();

        String sql = "SELECT order_detail_id, order_id, cake_id, quantity, sub_total "
                + "FROM orderdetail "
                + "ORDER BY order_detail_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                OrderDetail orderDetail = mapResultSetToOrderDetail(resultSet);
                orderDetailList.add(orderDetail);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return orderDetailList;
    }

    public OrderDetail getOrderDetailByID(Integer order_detail_id) {
        String sql = "SELECT order_detail_id, order_id, cake_id, quantity, sub_total "
                + "FROM orderdetail "
                + "WHERE order_detail_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, order_detail_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToOrderDetail(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean addOrderDetail(OrderDetail orderDetail) {
        String sql = "INSERT INTO orderdetail "
                + "(order_detail_id, order_id, cake_id, quantity, sub_total) "
                + "VALUES (?, ?, ?, ?, ?)";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, orderDetail.getOrder_detail_id());
            statement.setInt(2, orderDetail.getOrder_id());
            statement.setInt(3, orderDetail.getCake_id());
            statement.setInt(4, orderDetail.getQuantity());
            statement.setBigDecimal(5, orderDetail.getSub_total());

            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean updateOrderDetail(Integer order_detail_id, OrderDetail orderDetail) {
        String sql = "UPDATE orderdetail "
                + "SET order_id = ?, cake_id = ?, quantity = ?, sub_total = ? "
                + "WHERE order_detail_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, orderDetail.getOrder_id());
            statement.setInt(2, orderDetail.getCake_id());
            statement.setInt(3, orderDetail.getQuantity());
            statement.setBigDecimal(4, orderDetail.getSub_total());
            statement.setInt(5, order_detail_id);

            int rowsUpdated = statement.executeUpdate();
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteOrderDetail(Integer order_detail_id) {
        String sql = "DELETE FROM orderdetail WHERE order_detail_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, order_detail_id);

            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
    public boolean deleteOrderDetailsByOrderID(Integer order_id) {
    String sql = "DELETE FROM orderdetail WHERE order_id = ?";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, order_id);

        int rowsDeleted = statement.executeUpdate();

        // rowsDeleted = 0 van khong phai loi
        return rowsDeleted >= 0;

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return false;
}

public boolean deleteOrderDetailsByCakeID(Integer cake_id) {
    String sql = "DELETE FROM orderdetail WHERE cake_id = ?";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, cake_id);

        int rowsDeleted = statement.executeUpdate();

        // rowsDeleted = 0 van khong phai loi
        return rowsDeleted >= 0;

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return false;
}

    private OrderDetail mapResultSetToOrderDetail(ResultSet resultSet) throws SQLException {
        OrderDetail orderDetail = new OrderDetail();

        orderDetail.setOrder_detail_id(resultSet.getInt("order_detail_id"));
        orderDetail.setOrder_id(resultSet.getInt("order_id"));
        orderDetail.setCake_id(resultSet.getInt("cake_id"));
        orderDetail.setQuantity(resultSet.getInt("quantity"));

        BigDecimal subTotal = resultSet.getBigDecimal("sub_total");
        orderDetail.setSub_total(subTotal);

        return orderDetail;
    }
}