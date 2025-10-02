package com.app.thyme.repository;

import com.app.thyme.entity.Grocery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroceryRepository extends JpaRepository<Grocery, Long> {
    // JpaRepository provides the following:
    // - save(entity)
    // - findAll()
    // - findById(id)
    // - deleteById(id)
    // - count()
}
