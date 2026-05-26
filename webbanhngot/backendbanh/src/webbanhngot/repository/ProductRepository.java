package webbanhngot.repository;
import java.math.BigDecimal;
import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import webbanhngot.db.DBConnection;
import webbanhngot.entity.Product;
public class ProductRepository {
      public ArrayList<Product> getAllProducts() {
        ArrayList<Product> productList = new ArrayList<Product>();

        String sql = "SELECT cake_id, option_cake_id, quantity, price, description, cake_name, create_at "
                + "FROM product "
                + "ORDER BY cake_id";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql);
                ResultSet resultSet = statement.executeQuery()) {

            while (resultSet.next()) {
                Product product = mapResultSetToProduct(resultSet);
                productList.add(product);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return productList;
    }
    public Product getProductByCakeID(Integer cake_id) {
        String sql = "SELECT cake_id, option_cake_id, quantity, price, description, cake_name, create_at "
                + "FROM product "
                + "WHERE cake_id = ?";

        try (
                Connection connection = DBConnection.getConnection();
                PreparedStatement statement = connection.prepareStatement(sql)) {

            statement.setInt(1, cake_id);

            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    return mapResultSetToProduct(resultSet);
                }
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return null;
    }
    private Product mapResultSetToProduct(ResultSet resultSet) throws SQLException {
        Product product = new Product();

        product.setCake_id(resultSet.getInt("cake_id"));
        product.setOption_cake_id(resultSet.getInt("option_cake_id"));
        product.setQuantity(resultSet.getInt("quantity"));

        BigDecimal price = resultSet.getBigDecimal("price");
        product.setPrice(price);

        String[] description = getStringArray(resultSet, "description");
        product.setDescription(description);

        product.setCake_name(resultSet.getString("cake_name"));

        if (resultSet.getTimestamp("create_at") != null) {
            product.setCreate_at(resultSet.getTimestamp("create_at").toLocalDateTime());
        }

        return product;
    }

    private String[] getStringArray(ResultSet resultSet, String columnName) throws SQLException {
        Array sqlArray = resultSet.getArray(columnName);

        if (sqlArray == null) {
            return null;
        }

        Object arrayObject = sqlArray.getArray();

        if (arrayObject instanceof String[]) {
            return (String[]) arrayObject;
        }

        Object[] objectArray = (Object[]) arrayObject;
        String[] stringArray = new String[objectArray.length];

        for (int i = 0; i < objectArray.length; i++) {
            stringArray[i] = String.valueOf(objectArray[i]);
        }

        return stringArray;
    }
}

