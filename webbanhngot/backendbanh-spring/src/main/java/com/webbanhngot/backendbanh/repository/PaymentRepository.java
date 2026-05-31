package com.com.webbanhngot.backendbackendbanh.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import com.com.webbanhngot.backendbackendbanh.db.DBConnection;
import com.com.webbanhngot.backendbackendbanh.entity.Payment;

public class PaymentRepository {

    public ArrayList<Payment> getAllPayments() {
        ArrayList<Payment> paymentList = new ArrayList<Payment>();

        String sql = "SELECT payment_id, order_id, payment_method, payment_status, payment_date "
                + "FROM payment "
                + "ORDER BY payment_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Payment payment = mapResultSetToPayment(resultSet);
                paymentList.add(payment);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return paymentList;
    }

    public Payment getPaymentByID(Integer payment_id) {
        String sql = "SELECT payment_id, order_id, payment_method, payment_status, payment_date "
                + "FROM payment "
                + "WHERE payment_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, payment_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToPayment(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public Payment getPaymentByOrderID(Integer order_id) {
        String sql = "SELECT payment_id, order_id, payment_method, payment_status, payment_date "
                + "FROM payment "
                + "WHERE order_id = ? "
                + "ORDER BY payment_id "
                + "LIMIT 1";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, order_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToPayment(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean addPayment(Payment payment) {
        String sql = "INSERT INTO payment "
                + "(payment_id, order_id, payment_method, payment_status, payment_date) "
                + "VALUES (?, ?, ?, ?, ?)";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, payment.getPayment_id());
            statement.setInt(2, payment.getOrder_id());
            statement.setString(3, payment.getPayment_method());
            statement.setString(4, payment.getPayment_status());

            if (payment.getPayment_date() != null) {
                statement.setTimestamp(5, Timestamp.valueOf(payment.getPayment_date()));
            } else {
                statement.setTimestamp(5, null);
            }

            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean updatePayment(Integer payment_id, Payment payment) {
        String sql = "UPDATE payment "
                + "SET order_id = ?, payment_method = ?, payment_status = ?, payment_date = ? "
                + "WHERE payment_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, payment.getOrder_id());
            statement.setString(2, payment.getPayment_method());
            statement.setString(3, payment.getPayment_status());

            if (payment.getPayment_date() != null) {
                statement.setTimestamp(4, Timestamp.valueOf(payment.getPayment_date()));
            } else {
                statement.setTimestamp(4, null);
            }

            statement.setInt(5, payment_id);

            int rowsUpdated = statement.executeUpdate();
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deletePayment(Integer payment_id) {
        String sql = "DELETE FROM payment WHERE payment_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, payment_id);

            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deletePaymentsByOrderID(Integer order_id) {
        String sql = "DELETE FROM payment WHERE order_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, order_id);

            int rowsDeleted = statement.executeUpdate();

            // Nếu rowsDeleted > 0: có payment và đã xóa.
            // Nếu rowsDeleted == 0: không có payment phụ thuộc, vẫn coi là không lỗi.
            return rowsDeleted >= 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    private Payment mapResultSetToPayment(ResultSet resultSet) throws SQLException {
        Payment payment = new Payment();

        payment.setPayment_id(resultSet.getInt("payment_id"));
        payment.setOrder_id(resultSet.getInt("order_id"));
        payment.setPayment_method(resultSet.getString("payment_method"));
        payment.setPayment_status(resultSet.getString("payment_status"));

        Timestamp paymentDate = resultSet.getTimestamp("payment_date");
        if (paymentDate != null) {
            payment.setPayment_date(paymentDate.toLocalDateTime());
        }

        return payment;
    }
}