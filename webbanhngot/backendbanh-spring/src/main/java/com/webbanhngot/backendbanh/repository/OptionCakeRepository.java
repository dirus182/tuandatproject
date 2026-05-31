package com.com.webbanhngot.backendbackendbanh.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.com.webbanhngot.backendbackendbanh.db.DBConnection;
import com.com.webbanhngot.backendbackendbanh.entity.OptionCake;
/*Lấy tất cả option cake
Lấy option cake theo ID
Thêm option cake
Cập nhật option cake
Xóa option cake
Chuyển dữ liệu từ ResultSet thành object OptionCake */
public class OptionCakeRepository {

    public ArrayList<OptionCake> getAllOptionCakes() {
        ArrayList<OptionCake> optionCakeList = new ArrayList<OptionCake>();

        String sql = "SELECT option_cake_id, category_name "
                + "FROM optioncake "
                + "ORDER BY option_cake_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                OptionCake optionCake = mapResultSetToOptionCake(resultSet);
                optionCakeList.add(optionCake);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return optionCakeList;
    }

    public OptionCake getOptionCakeByID(Integer option_cake_id) {
        String sql = "SELECT option_cake_id, category_name "
                + "FROM optioncake "
                + "WHERE option_cake_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, option_cake_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToOptionCake(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean addOptionCake(OptionCake optionCake) {
        String sql = "INSERT INTO optioncake "
                + "(option_cake_id, category_name) "
                + "VALUES (?, ?)";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, optionCake.getOption_cake_id());
            statement.setString(2, optionCake.getCategory_name());

            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean updateOptionCake(Integer option_cake_id, OptionCake optionCake) {
        String sql = "UPDATE optioncake "
                + "SET category_name = ? "
                + "WHERE option_cake_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setString(1, optionCake.getCategory_name());
            statement.setInt(2, option_cake_id);

            int rowsUpdated = statement.executeUpdate();
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteOptionCake(Integer option_cake_id) {
        String sql = "DELETE FROM optioncake WHERE option_cake_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, option_cake_id);

            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    private OptionCake mapResultSetToOptionCake(ResultSet resultSet) throws SQLException {
        OptionCake optionCake = new OptionCake();

        optionCake.setOption_cake_id(resultSet.getInt("option_cake_id"));
        optionCake.setCategory_name(resultSet.getString("category_name"));

        return optionCake;
    }
}