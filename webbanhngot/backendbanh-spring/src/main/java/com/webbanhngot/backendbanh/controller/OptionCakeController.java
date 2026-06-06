package com.webbanhngot.backendbanh.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.*;

import com.webbanhngot.backendbanh.entity.OptionCake;
import com.webbanhngot.backendbanh.service.OptionCakeService;

@RestController
@RequestMapping("/api/options")
public class OptionCakeController {

    private OptionCakeService optionCakeService = new OptionCakeService();

    @GetMapping
    public ArrayList<OptionCake> getAllOptions() {
        return optionCakeService.getAllOptionCakes();
    }

    @GetMapping("/{id}")
    public OptionCake getOptionById(@PathVariable("id") Integer optionId) {
        return optionCakeService.getOptionCakeByID(optionId);
    }

    @PostMapping
    public boolean createOption(@RequestBody OptionCake option) {
        return optionCakeService.addOptionCake(option);
    }

    @PutMapping("/{id}")
    public boolean updateOption(@PathVariable("id") Integer optionId,
                                @RequestBody OptionCake updatedOption) {
        return optionCakeService.updateOptionCake(optionId, updatedOption);
    }

    @DeleteMapping("/{id}")
    public boolean deleteOption(@PathVariable("id") Integer optionId) {
        return optionCakeService.deleteOptionCake(optionId);
    }
}