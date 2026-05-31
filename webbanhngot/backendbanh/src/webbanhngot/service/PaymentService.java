package webbanhngot.service;

import java.util.ArrayList;

import webbanhngot.entity.Payment;
import webbanhngot.repository.PaymentRepository;

public class PaymentService {

    private PaymentRepository paymentRepository = new PaymentRepository();

    // C - Create
    public boolean addPayment(Payment payment) {
        if (!isValidPayment(payment)) {
            return false;
        }

        Payment existingPayment = paymentRepository.getPaymentByID(payment.getPayment_id());

        if (existingPayment != null) {
            return false;
        }

        return paymentRepository.addPayment(payment);
    }

    // R - Read all
    public ArrayList<Payment> getAllPayments() {
        return paymentRepository.getAllPayments();
    }

    // R - Read by payment_id
    public Payment getPaymentByID(Integer payment_id) {
        if (payment_id == null) {
            return null;
        }

        return paymentRepository.getPaymentByID(payment_id);
    }

    // R - Read by order_id
    public Payment getPaymentByOrderID(Integer order_id) {
        if (order_id == null) {
            return null;
        }

        return paymentRepository.getPaymentByOrderID(order_id);
    }

    // U - Update
    public boolean updatePayment(Integer payment_id, Payment newPayment) {
        if (payment_id == null || !isValidPayment(newPayment)) {
            return false;
        }

        Payment existingPayment = paymentRepository.getPaymentByID(payment_id);

        if (existingPayment == null) {
            return false;
        }

        return paymentRepository.updatePayment(payment_id, newPayment);
    }

    // D - Delete by payment_id
    public boolean deletePayment(Integer payment_id) {
        if (payment_id == null) {
            return false;
        }

        Payment existingPayment = paymentRepository.getPaymentByID(payment_id);

        if (existingPayment == null) {
            return false;
        }

        return paymentRepository.deletePayment(payment_id);
    }

    // D - Delete by order_id
    public boolean deletePaymentsByOrderID(Integer order_id) {
        if (order_id == null) {
            return false;
        }

        return paymentRepository.deletePaymentsByOrderID(order_id);
    }

    private boolean isValidPayment(Payment payment) {
        if (payment == null) {
            return false;
        }

        if (payment.getPayment_id() == null || payment.getPayment_id() <= 0) {
            return false;
        }

        if (payment.getOrder_id() == null || payment.getOrder_id() <= 0) {
            return false;
        }

        if (payment.getPayment_method() == null || payment.getPayment_method().isBlank()) {
            return false;
        }

        if (!isValidPaymentMethod(payment.getPayment_method())) {
            return false;
        }

        if (payment.getPayment_status() == null || payment.getPayment_status().isBlank()) {
            return false;
        }

        if (!isValidPaymentStatus(payment.getPayment_status())) {
            return false;
        }

        if (payment.getPayment_date() == null) {
            return false;
        }

        return true;
    }

    private boolean isValidPaymentMethod(String paymentMethod) {
        return paymentMethod.equals("paypal")
                || paymentMethod.equals("cash")
                || paymentMethod.equals("credit_card");
    }

    private boolean isValidPaymentStatus(String paymentStatus) {
        return paymentStatus.equals("pending")
                || paymentStatus.equals("completed");
    }
}