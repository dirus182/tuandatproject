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

import com.webbanhngot.backendbanh.entity.Customer;
import com.webbanhngot.backendbanh.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private CustomerService customerService = new CustomerService();

    @GetMapping
    public ArrayList<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable("id") Integer customerId) {
        return customerService.getCustomerByID(customerId);
    }

    @PostMapping
    public boolean createCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @PutMapping("/{id}")
    public boolean updateCustomer(@PathVariable("id") Integer customerId,
                                  @RequestBody Customer updatedCustomer) {
        return customerService.updateCustomer(customerId, updatedCustomer);
    }

    @DeleteMapping("/{id}")
    public boolean deleteCustomer(@PathVariable("id") Integer customerId) {
        return customerService.deleteCustomer(customerId);
    }
}
