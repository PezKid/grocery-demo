package com.app.thyme.service;

import com.app.thyme.entity.Grocery;
import com.app.thyme.repository.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroceryService {

    @Autowired
    private GroceryRepository groceryRepository;

    // Get all groceries
    public List<Grocery> getAllGroceries() {
        return groceryRepository.findAll();
    }

    // Get grocery by ID
    public Optional<Grocery> getGroceryById(Long id) {
        return groceryRepository.findById(id);
    }

    // Add new grocery
    public Grocery addGrocery(String name, Integer quantity) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Name must not be empty.");
        }

        Grocery newGrocery = new Grocery(name, quantity);
        return groceryRepository.save(newGrocery);
    }

    // Update grocery
    public Grocery updateGrocery(Long id, String name, Integer quantity) {
        Grocery updatedGrocery = groceryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Grocery not found with id: " + id));

        updatedGrocery.setName(name);
        updatedGrocery.setQuantity(quantity);

        return groceryRepository.save(updatedGrocery);
    }

    // Delete grocery
    public void deleteGrocery(Long id) {
        if (!groceryRepository.existsById(id)) {
            throw new RuntimeException("Grocery not found with id: " + id);
        }

        groceryRepository.deleteById(id);
    }
}
