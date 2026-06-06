package com.webbanhngot.backendbanh.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

import com.webbanhngot.backendbanh.entity.CustomerOrder;
import com.webbanhngot.backendbanh.service.CustomerOrderService;

@RestController
@RequestMapping("/api/orders")
public class CustomerOrderController {

    private CustomerOrderService customerOrderService = new CustomerOrderService();

    @GetMapping
    public ArrayList<CustomerOrder> getAllOrders() {
        return customerOrderService.getAllCustomerOrders();
    }

    @GetMapping("/{id}")
    public CustomerOrder getOrderById(@PathVariable("id") Integer orderId) {
        return customerOrderService.getCustomerOrderByID(orderId);
    }

    @PostMapping
    public boolean createOrder(@RequestBody CustomerOrder order) {
        return customerOrderService.addCustomerOrder(order);
    }

    @PutMapping("/{id}")
    public boolean updateOrder(@PathVariable("id") Integer orderId,
                               @RequestBody CustomerOrder updatedOrder) {
        return customerOrderService.updateCustomerOrder(orderId, updatedOrder);
    }

    @DeleteMapping("/{id}")
    public boolean deleteOrder(@PathVariable("id") Integer orderId) {
        return customerOrderService.deleteCustomerOrder(orderId);
    }
}