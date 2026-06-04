package com.webbanhngot.backendbanh.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.webbanhngot.backendbanh.db.DBConnection;
import com.webbanhngot.backendbanh.entity.Customer;
public class CustomerRepository {

    public ArrayList<Customer> getAllCustomers() {
        ArrayList<Customer> customerList = new ArrayList<Customer>();

        String sql = "SELECT customer_id, phone_number, first_name, last_name, customer_email, address_id "
                + "FROM customer "
                + "ORDER BY customer_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Customer customer = mapResultSetToCustomer(resultSet);
                customerList.add(customer);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return customerList;
    }

    public Customer getCustomerByID(Integer customer_id) {
        String sql = "SELECT customer_id, phone_number, first_name, last_name, customer_email, address_id "
                + "FROM customer "
                + "WHERE customer_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, customer_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToCustomer(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean addCustomer(Customer customer) {
        String sql = "INSERT INTO customer "
                + "(customer_id, phone_number, first_name, last_name, customer_email, address_id) "
                + "VALUES (?, ?, ?, ?, ?, ?)";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, customer.getCustomer_id());
            statement.setString(2, customer.getPhone_number());
            statement.setString(3, customer.getFirst_name());
            statement.setString(4, customer.getLast_name());
            statement.setString(5, customer.getCustomer_email());
            statement.setString(6, customer.getAddress_id());

            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean updateCustomer(Integer customer_id, Customer customer) {
        String sql = "UPDATE customer "
                + "SET phone_number = ?, first_name = ?, last_name = ?, customer_email = ?, address_id = ? "
                + "WHERE customer_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, customer.getPhone_number());
            statement.setString(2, customer.getFirst_name());
            statement.setString(3, customer.getLast_name());
            statement.setString(4, customer.getCustomer_email());
            statement.setString(5, customer.getAddress_id());
            statement.setInt(6, customer_id);

            int rowsUpdated = statement.executeUpdate();
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteCustomer(Integer customer_id) {
        String sql = "DELETE FROM customer WHERE customer_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, customer_id);

            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    private Customer mapResultSetToCustomer(ResultSet resultSet) throws SQLException {
        Customer customer = new Customer();

        customer.setCustomer_id(resultSet.getInt("customer_id"));
        customer.setPhone_number(resultSet.getString("phone_number"));
        customer.setFirst_name(resultSet.getString("first_name"));
        customer.setLast_name(resultSet.getString("last_name"));
        customer.setCustomer_email(resultSet.getString("customer_email"));
        customer.setAddress_id(resultSet.getString("address_id"));

        return customer;
    }
}