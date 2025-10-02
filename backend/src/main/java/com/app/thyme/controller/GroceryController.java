package com.app.thyme.controller;

import com.app.thyme.dto.GroceryRequest;
import com.app.thyme.entity.Grocery;
import com.app.thyme.service.GroceryService;
import org.apache.el.lang.ELArithmetic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grocery")
public class GroceryController {
    @Autowired
    private GroceryService groceryService;

    // GET /api/grocery/all
    @GetMapping("/all")
    public ResponseEntity<List<Grocery>> getAllGroceries() {
        List<Grocery> groceryList = groceryService.getAllGroceries();
        return ResponseEntity.ok(groceryList);
    }

    // GET /api/grocery/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Grocery> getGroceryById(@PathVariable Long id) {
        return groceryService.getGroceryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/grocery/add
    @PostMapping("/add")
    public ResponseEntity<Grocery> addGrocery(@RequestBody GroceryRequest request) {
        try {
            Grocery grocery = groceryService.addGrocery(
                    request.getName(),
                    request.getQuantity()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(grocery);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT /api/grocery/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Grocery> updateGrocery(
            @PathVariable Long id,
            @RequestBody GroceryRequest request) {
        try {
            Grocery grocery = groceryService.updateGrocery(
                    id,
                    request.getName(),
                    request.getQuantity()
            );
            return ResponseEntity.ok(grocery);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/grocery/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Grocery> deleteGrocery(@PathVariable Long id) {
        try {
            groceryService.deleteGrocery(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
