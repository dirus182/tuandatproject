package webbanhngot.app;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;

import webbanhngot.entity.CustomerOrder;
import webbanhngot.repository.CustomerOrderRepository;

public class MainTest {
    public static void main(String[] args) {
        CustomerOrderRepository customerOrderRepository = new CustomerOrderRepository();

        Integer testOrderId = 9999;

        // Xoa truoc neu lan truoc test bi dung giua chung
        customerOrderRepository.deleteCustomerOrder(testOrderId);

        // =========================
        // C - CREATE
        // =========================
        CustomerOrder newOrder = new CustomerOrder();
        newOrder.setOrder_id(testOrderId);
        newOrder.setCustomer_id(5);
        newOrder.setStatus("pending");
        newOrder.setOrder_date(LocalDateTime.now());
        newOrder.setTotal_price(new BigDecimal("99.99"));

        boolean addResult = customerOrderRepository.addCustomerOrder(newOrder);

        System.out.println("=== INSERT CUSTOMER ORDER ===");
        System.out.println("Them customer order thanh cong khong? " + addResult);

        // =========================
        // R - READ BY ID
        // =========================
        CustomerOrder foundAfterInsert = customerOrderRepository.getCustomerOrderByID(testOrderId);

        System.out.println("\n=== READ CUSTOMER ORDER SAU INSERT ===");
        if (foundAfterInsert != null) {
            System.out.println("Tim thay: " + foundAfterInsert);
        } else {
            System.out.println("Khong tim thay customer order sau insert");
        }

        // =========================
        // U - UPDATE
        // =========================
        CustomerOrder updatedOrder = new CustomerOrder();
        updatedOrder.setOrder_id(testOrderId);
        updatedOrder.setCustomer_id(5);
        updatedOrder.setStatus("shipped");
        updatedOrder.setOrder_date(LocalDateTime.now());
        updatedOrder.setTotal_price(new BigDecimal("129.99"));

        boolean updateResult = customerOrderRepository.updateCustomerOrder(testOrderId, updatedOrder);

        System.out.println("\n=== UPDATE CUSTOMER ORDER ===");
        System.out.println("Update customer order thanh cong khong? " + updateResult);

        CustomerOrder foundAfterUpdate = customerOrderRepository.getCustomerOrderByID(testOrderId);

        System.out.println("\n=== READ CUSTOMER ORDER SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay customer order sau update");
        }

        // =========================
        // R - READ ALL
        // =========================
        ArrayList<CustomerOrder> orderList = customerOrderRepository.getAllCustomerOrders();

        System.out.println("\n=== DANH SACH CUSTOMER ORDER TU DATABASE ===");
        System.out.println("So luong customer order hien tai: " + orderList.size());

        for (int i = 0; i < Math.min(5, orderList.size()); i++) {
            System.out.println(orderList.get(i));
        }

        // =========================
        // D - DELETE
        // =========================
        boolean deleteResult = customerOrderRepository.deleteCustomerOrder(testOrderId);

        System.out.println("\n=== DELETE CUSTOMER ORDER ===");
        System.out.println("Delete customer order thanh cong khong? " + deleteResult);

        CustomerOrder foundAfterDelete = customerOrderRepository.getCustomerOrderByID(testOrderId);

        System.out.println("\n=== READ CUSTOMER ORDER SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con order_id = " + testOrderId);
        } else {
            System.out.println("Van con customer order: " + foundAfterDelete);
        }
    }
}