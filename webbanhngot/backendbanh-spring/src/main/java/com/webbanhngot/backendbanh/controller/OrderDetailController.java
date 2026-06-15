package com.webbanhngot.backendbanh.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webbanhngot.backendbanh.entity.OrderDetail;
import com.webbanhngot.backendbanh.service.OrderDetailService;

@RestController
@RequestMapping("/api/order-details")
public class OrderDetailController {

    private OrderDetailService orderDetailService = new OrderDetailService();

    @GetMapping
    public ArrayList<OrderDetail> getAllOrderDetails() {
        return orderDetailService.getAllOrderDetails();
    }

    @GetMapping("/{id}")
    public OrderDetail getOrderDetailById(@PathVariable("id") Integer orderDetailId) {
        return orderDetailService.getOrderDetailByID(orderDetailId);
    }

    @PostMapping
    public boolean createOrderDetail(@RequestBody OrderDetail orderDetail) {
        return orderDetailService.addOrderDetail(orderDetail);
    }

    @PutMapping("/{id}")
    public boolean updateOrderDetail(@PathVariable("id") Integer orderDetailId,
                                     @RequestBody OrderDetail updatedOrderDetail) {
        return orderDetailService.updateOrderDetail(orderDetailId, updatedOrderDetail);
    }

    @DeleteMapping("/{id}")
    public boolean deleteOrderDetail(@PathVariable("id") Integer orderDetailId) {
        return orderDetailService.deleteOrderDetail(orderDetailId);
    }
}
