package webbanhngot.app;

import java.math.BigDecimal;
import java.util.ArrayList;

import webbanhngot.entity.OrderDetail;
import webbanhngot.repository.OrderDetailRepository;

public class MainTest {
    public static void main(String[] args) {
        OrderDetailRepository orderDetailRepository = new OrderDetailRepository();

        Integer testOrderDetailId = 9999;

        // Xoa truoc neu lan truoc test bi dung giua chung
        orderDetailRepository.deleteOrderDetail(testOrderDetailId);

        // =========================
        // C - CREATE
        // =========================
        OrderDetail newOrderDetail = new OrderDetail();
        newOrderDetail.setOrder_detail_id(testOrderDetailId);
        newOrderDetail.setOrder_id(170);
        newOrderDetail.setCake_id(1);
        newOrderDetail.setQuantity(2);
        newOrderDetail.setSub_total(new BigDecimal("11.98"));

        boolean addResult = orderDetailRepository.addOrderDetail(newOrderDetail);

        System.out.println("=== INSERT ORDER DETAIL ===");
        System.out.println("Them order detail thanh cong khong? " + addResult);

        // =========================
        // R - READ BY ID
        // =========================
        OrderDetail foundAfterInsert = orderDetailRepository.getOrderDetailByID(testOrderDetailId);

        System.out.println("\n=== READ ORDER DETAIL SAU INSERT ===");
        if (foundAfterInsert != null) {
            System.out.println("Tim thay: " + foundAfterInsert);
        } else {
            System.out.println("Khong tim thay order detail sau insert");
        }

        // =========================
        // U - UPDATE
        // =========================
        OrderDetail updatedOrderDetail = new OrderDetail();
        updatedOrderDetail.setOrder_detail_id(testOrderDetailId);
        updatedOrderDetail.setOrder_id(170);
        updatedOrderDetail.setCake_id(2);
        updatedOrderDetail.setQuantity(3);
        updatedOrderDetail.setSub_total(new BigDecimal("19.47"));

        boolean updateResult = orderDetailRepository.updateOrderDetail(testOrderDetailId, updatedOrderDetail);

        System.out.println("\n=== UPDATE ORDER DETAIL ===");
        System.out.println("Update order detail thanh cong khong? " + updateResult);

        OrderDetail foundAfterUpdate = orderDetailRepository.getOrderDetailByID(testOrderDetailId);

        System.out.println("\n=== READ ORDER DETAIL SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay order detail sau update");
        }

        // =========================
        // R - READ ALL
        // =========================
        ArrayList<OrderDetail> orderDetailList = orderDetailRepository.getAllOrderDetails();

        System.out.println("\n=== DANH SACH ORDER DETAIL TU DATABASE ===");
        System.out.println("So luong order detail hien tai: " + orderDetailList.size());

        for (int i = 0; i < Math.min(5, orderDetailList.size()); i++) {
            System.out.println(orderDetailList.get(i));
        }

        // =========================
        // D - DELETE
        // =========================
        boolean deleteResult = orderDetailRepository.deleteOrderDetail(testOrderDetailId);

        System.out.println("\n=== DELETE ORDER DETAIL ===");
        System.out.println("Delete order detail thanh cong khong? " + deleteResult);

        OrderDetail foundAfterDelete = orderDetailRepository.getOrderDetailByID(testOrderDetailId);

        System.out.println("\n=== READ ORDER DETAIL SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con order_detail_id = " + testOrderDetailId);
        } else {
            System.out.println("Van con order detail: " + foundAfterDelete);
        }
    }
}