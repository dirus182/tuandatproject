package com.webbanhngot.backendbanh.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

import com.webbanhngot.backendbanh.entity.Payment;
import com.webbanhngot.backendbanh.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private PaymentService paymentService = new PaymentService();

    @GetMapping
    public ArrayList<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable("id") Integer paymentId) {
        return paymentService.getPaymentByID(paymentId);
    }

    @PostMapping
    public boolean createPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("/{id}")
    public boolean updatePayment(@PathVariable("id") Integer paymentId,
                                 @RequestBody Payment updatedPayment) {
        return paymentService.updatePayment(paymentId, updatedPayment);
    }

    @DeleteMapping("/{id}")
    public boolean deletePayment(@PathVariable("id") Integer paymentId) {
        return paymentService.deletePayment(paymentId);
    }
}