package webbanhngot.repository;
import java.math.BigDecimal;
import java.sql.Array;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.Timestamp;
import java.sql.Types;
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
    public boolean addProduct(Product product) {
    String sql = "INSERT INTO product "
            + "(cake_id, option_cake_id, quantity, price, description, cake_name, create_at) "
            + "VALUES (?, ?, ?, ?, ?, ?, ?)";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, product.getCake_id());
        statement.setInt(2, product.getOption_cake_id());
        statement.setInt(3, product.getQuantity());
        statement.setBigDecimal(4, product.getPrice());

        if (product.getDescription() != null) {
            Array descriptionArray = connection.createArrayOf("text", product.getDescription());
            statement.setArray(5, descriptionArray);
        } else {
            statement.setNull(5, Types.ARRAY);
        }

        statement.setString(6, product.getCake_name());

        if (product.getCreate_at() != null) {
            statement.setTimestamp(7, Timestamp.valueOf(product.getCreate_at()));
        } else {
            statement.setTimestamp(7, null);
        }

        int rowsInserted = statement.executeUpdate();
        return rowsInserted > 0;

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return false;
}

public boolean updateProduct(Integer cake_id, Product product) {
    String sql = "UPDATE product "
            + "SET option_cake_id = ?, quantity = ?, price = ?, description = ?, cake_name = ?, create_at = ? "
            + "WHERE cake_id = ?";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, product.getOption_cake_id());
        statement.setInt(2, product.getQuantity());
        statement.setBigDecimal(3, product.getPrice());

        if (product.getDescription() != null) {
            Array descriptionArray = connection.createArrayOf("text", product.getDescription());
            statement.setArray(4, descriptionArray);
        } else {
            statement.setNull(4, Types.ARRAY);
        }

        statement.setString(5, product.getCake_name());

        if (product.getCreate_at() != null) {
            statement.setTimestamp(6, Timestamp.valueOf(product.getCreate_at()));
        } else {
            statement.setTimestamp(6, null);
        }

        statement.setInt(7, cake_id);

        int rowsUpdated = statement.executeUpdate();
        return rowsUpdated > 0;

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return false;
}

public boolean deleteProduct(Integer cake_id) {
    String sql = "DELETE FROM product WHERE cake_id = ?";

    try (
            Connection connection = DBConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {

        statement.setInt(1, cake_id);

        int rowsDeleted = statement.executeUpdate();
        return rowsDeleted > 0;

    } catch (SQLException e) {
        e.printStackTrace();
    }

    return false;
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

