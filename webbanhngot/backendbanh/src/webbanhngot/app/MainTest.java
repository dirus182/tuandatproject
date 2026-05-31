package webbanhngot.app;

import java.time.LocalDateTime;
import java.util.ArrayList;

import webbanhngot.entity.Payment;
import webbanhngot.repository.PaymentRepository;

public class MainTest {
    public static void main(String[] args) {
        PaymentRepository paymentRepository = new PaymentRepository();

        Integer testPaymentId = 9999;

        // Xoa truoc neu lan truoc test bi dung giua chung
        paymentRepository.deletePayment(testPaymentId);

        // =========================
        // C - CREATE
        // =========================
        Payment newPayment = new Payment();
        newPayment.setPayment_id(testPaymentId);
        newPayment.setOrder_id(170);
        newPayment.setPayment_method("cash");
        newPayment.setPayment_status("pending");
        newPayment.setPayment_date(LocalDateTime.now());

        boolean addResult = paymentRepository.addPayment(newPayment);

        System.out.println("=== INSERT PAYMENT ===");
        System.out.println("Them payment thanh cong khong? " + addResult);

        // =========================
        // R - READ BY ID
        // =========================
        Payment foundAfterInsert = paymentRepository.getPaymentByID(testPaymentId);

        System.out.println("\n=== READ PAYMENT SAU INSERT ===");
        if (foundAfterInsert != null) {
            System.out.println("Tim thay: " + foundAfterInsert);
        } else {
            System.out.println("Khong tim thay payment sau insert");
        }

        // =========================
        // U - UPDATE
        // =========================
        Payment updatedPayment = new Payment();
        updatedPayment.setPayment_id(testPaymentId);
        updatedPayment.setOrder_id(170);
        updatedPayment.setPayment_method("credit_card");
        updatedPayment.setPayment_status("completed");
        updatedPayment.setPayment_date(LocalDateTime.now());

        boolean updateResult = paymentRepository.updatePayment(testPaymentId, updatedPayment);

        System.out.println("\n=== UPDATE PAYMENT ===");
        System.out.println("Update payment thanh cong khong? " + updateResult);

        Payment foundAfterUpdate = paymentRepository.getPaymentByID(testPaymentId);

        System.out.println("\n=== READ PAYMENT SAU UPDATE ===");
        if (foundAfterUpdate != null) {
            System.out.println("Sau update: " + foundAfterUpdate);
        } else {
            System.out.println("Khong tim thay payment sau update");
        }

        // =========================
        // R - READ ALL
        // =========================
        ArrayList<Payment> paymentList = paymentRepository.getAllPayments();

        System.out.println("\n=== DANH SACH PAYMENT TU DATABASE ===");
        System.out.println("So luong payment hien tai: " + paymentList.size());

        for (int i = 0; i < Math.min(5, paymentList.size()); i++) {
            System.out.println(paymentList.get(i));
        }

        // =========================
        // D - DELETE
        // =========================
        boolean deleteResult = paymentRepository.deletePayment(testPaymentId);

        System.out.println("\n=== DELETE PAYMENT ===");
        System.out.println("Delete payment thanh cong khong? " + deleteResult);

        Payment foundAfterDelete = paymentRepository.getPaymentByID(testPaymentId);

        System.out.println("\n=== READ PAYMENT SAU DELETE ===");
        if (foundAfterDelete == null) {
            System.out.println("Da xoa thanh cong, khong con payment_id = " + testPaymentId);
        } else {
            System.out.println("Van con payment: " + foundAfterDelete);
        }
    }
}