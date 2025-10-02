package com.app.thyme.dto;

// DTO with fields name and quantity
public class GroceryRequest {
    private String name;
    private Integer quantity;

    // Constructors
    public GroceryRequest() {

    }

    public GroceryRequest(String name, Integer quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
