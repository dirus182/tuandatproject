package com.webbanhngot.backendbanh.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String DEFAULT_URL = "jdbc:postgresql://localhost:5432/20225802gr2";
    private static final String DEFAULT_USER = "postgres";
    private static final String DEFAULT_PASSWORD = "admin";

    public static Connection getConnection() throws SQLException {
        String url = getConfig("DB_URL", "SPRING_DATASOURCE_URL", DEFAULT_URL);
        String user = getConfig("DB_USER", "SPRING_DATASOURCE_USERNAME", DEFAULT_USER);
        String password = getConfig("DB_PASSWORD", "SPRING_DATASOURCE_PASSWORD", DEFAULT_PASSWORD);

        return DriverManager.getConnection(url, user, password);
    }

    private static String getConfig(String primaryKey, String secondaryKey, String defaultValue) {
        String value = System.getenv(primaryKey);

        if (value == null || value.isBlank()) {
            value = System.getenv(secondaryKey);
        }

        if (value == null || value.isBlank()) {
            value = System.getProperty(primaryKey);
        }

        if (value == null || value.isBlank()) {
            value = System.getProperty(secondaryKey);
        }

        return value == null || value.isBlank() ? defaultValue : value;
    }
}
