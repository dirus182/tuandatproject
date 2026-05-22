package webbanhngot.app;

import java.sql.Connection;

import webbanhngot.db.DBConnection;

public class MainTest {
    public static void main(String[] args) {
        try {
            Connection connection = DBConnection.getConnection();

            if (connection != null) {
                System.out.println("Ket noi PostgreSQL thanh cong");
            }

            connection.close();
        } catch (Exception e) {
            System.out.println("Ket noi PostgreSQL that bai");
            e.printStackTrace();
        }
    }
}