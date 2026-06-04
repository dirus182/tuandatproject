package com.webbanhngot.backendbanh.repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;

import com.webbanhngot.backendbanh.db.DBConnection;
import com.webbanhngot.backendbanh.entity.Review;

public class ReviewRepository {

    public ArrayList<Review> getAllReviews() {
        ArrayList<Review> reviewList = new ArrayList<Review>();

        String sql = "SELECT reviews_id, order_detail_id, created_at, customer_comment, rating "
                + "FROM review "
                + "ORDER BY reviews_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Review review = mapResultSetToReview(resultSet);
                reviewList.add(review);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return reviewList;
    }

    public Review getReviewByID(Integer reviews_id) {
        String sql = "SELECT reviews_id, order_detail_id, created_at, customer_comment, rating "
                + "FROM review "
                + "WHERE reviews_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, reviews_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToReview(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }

    public boolean addReview(Review review) {
        String sql = "INSERT INTO review "
                + "(reviews_id, order_detail_id, created_at, customer_comment, rating) "
                + "VALUES (?, ?, ?, ?, ?)";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, review.getReviews_id());
            statement.setInt(2, review.getOrder_detail_id());

            if (review.getCreate_at() != null) {
                statement.setTimestamp(3, Timestamp.valueOf(review.getCreate_at()));
            } else {
                statement.setTimestamp(3, null);
            }

            statement.setString(4, review.getCustomer_comment());
            statement.setInt(5, review.getRating());

            int rowsInserted = statement.executeUpdate();
            return rowsInserted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean updateReview(Integer reviews_id, Review review) {
        String sql = "UPDATE review "
                + "SET order_detail_id = ?, created_at = ?, customer_comment = ?, rating = ? "
                + "WHERE reviews_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, review.getOrder_detail_id());

            if (review.getCreate_at() != null) {
                statement.setTimestamp(2, Timestamp.valueOf(review.getCreate_at()));
            } else {
                statement.setTimestamp(2, null);
            }

            statement.setString(3, review.getCustomer_comment());
            statement.setInt(4, review.getRating());
            statement.setInt(5, reviews_id);

            int rowsUpdated = statement.executeUpdate();
            return rowsUpdated > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean deleteReview(Integer reviews_id) {
        String sql = "DELETE FROM review WHERE reviews_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, reviews_id);

            int rowsDeleted = statement.executeUpdate();
            return rowsDeleted > 0;

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }
     public boolean deleteReviewsByOrderDetailID(Integer order_detail_id) {
    String sql = "DELETE FROM review WHERE order_detail_id = ?";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, order_detail_id);

        int rowsDeleted = statement.executeUpdate();

        // rowsDeleted = 0 van khong phai loi
        return rowsDeleted >= 0;

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return false;
}

public boolean deleteReviewsByOrderID(Integer order_id) {
    String sql = "DELETE FROM review "
            + "WHERE order_detail_id IN ("
            + "SELECT order_detail_id FROM orderdetail WHERE order_id = ?"
            + ")";

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
    private Review mapResultSetToReview(ResultSet resultSet) throws SQLException {
        Review review = new Review();

        review.setReviews_id(resultSet.getInt("reviews_id"));
        review.setOrder_detail_id(resultSet.getInt("order_detail_id"));

        Timestamp createdAt = resultSet.getTimestamp("created_at");
        if (createdAt != null) {
            review.setCreate_at(createdAt.toLocalDateTime());
        }

        review.setCustomer_comment(resultSet.getString("customer_comment"));
        review.setRating(resultSet.getInt("rating"));

        return review;
    }
}