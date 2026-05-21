package webbanhngot.app;

import java.time.LocalDateTime;

import webbanhngot.entity.Payment;
import webbanhngot.service.PaymentService;

public class MainTest {
    public static void main(String[] args) {
        PaymentService paymentService = new PaymentService();

        // C - CREATE
        Payment payment1 = new Payment();
        payment1.setPayment_id(10);
        payment1.setOrder_id(25);
        payment1.setPayment_method("cash");
        payment1.setPayment_status("pending");
        payment1.setPayment_date(LocalDateTime.now());

        paymentService.addPayment(payment1);

        System.out.println("=== SAU KHI THEM PAYMENT ===");
        System.out.println("So luong payment: " + paymentService.getAllPayments().size());
        System.out.println(paymentService.getAllPayments());

        // R - READ BY ID
        Payment foundPayment = paymentService.getPaymentByID(10);

        System.out.println("\n=== TIM PAYMENT THEO payment_id = 10 ===");
        if (foundPayment != null) {
            System.out.println("Tim thay: " + foundPayment);
        } else {
            System.out.println("Khong tim thay payment");
        }

        // U - UPDATE
        Payment updatedPayment = new Payment();
        updatedPayment.setPayment_id(10);
        updatedPayment.setOrder_id(25);
        updatedPayment.setPayment_method("credit_card");
        updatedPayment.setPayment_status("completed");
        updatedPayment.setPayment_date(LocalDateTime.now());

        boolean updateResult = paymentService.updatePayment(10, updatedPayment);

        System.out.println("\n=== UPDATE PAYMENT payment_id = 10 ===");
        System.out.println("Update thanh cong khong? " + updateResult);
        System.out.println("Sau update: " + paymentService.getPaymentByID(10));

        // D - DELETE
        boolean deleteResult = paymentService.deletePayment(10);

        System.out.println("\n=== DELETE PAYMENT payment_id = 10 ===");
        System.out.println("Delete thanh cong khong? " + deleteResult);
        System.out.println("So luong payment sau delete: " + paymentService.getAllPayments().size());
    }
}