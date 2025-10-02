import React, { useState, useEffect } from 'react';
import groceryService from '../services/groceryService';
import GroceryForm from './GroceryForm';
import GroceryItem from './GroceryItem';
import LoadingSpinner from './LoadingSpinner';

function GroceryList() {
    // ========== STATE MANAGEMENT ==========
    const [groceries, setGroceries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    // ========== LIFECYCLE ==========
    // Load groceries when component mounts
    useEffect(() => {
        loadGroceries();
    }, []);

    // ========== API CALL FUNCTIONS ==========
    // These are your "doMethod" functions

    const loadGroceries = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await groceryService.getAll();
            setGroceries(data);
        } catch (err) {
            console.error('Error loading groceries:', err);
            setError('Failed to load groceries. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const handleAddGrocery = async (groceryData) => {
        try {
            setActionLoading(true);
            setError(null);
            const newGrocery = await groceryService.addGrocery(groceryData);

            // Update local state
            setGroceries([...groceries, newGrocery]);

            console.log('Grocery added successfully!');
        } catch (err) {
            console.error('Error adding grocery:', err);
            setError('Failed to add grocery. Please try again.');
            loadGroceries(); // Reload on error
        } finally {
            setActionLoading(false);
        }
    };

    const handleUpdateGrocery = async (id, groceryData) => {
        try {
            setActionLoading(true);
            setError(null);
            const updatedGrocery = await groceryService.updateGrocery(id, groceryData);

            // Update local state
            setGroceries(groceries.map(g =>
                g.id === id ? updatedGrocery : g
            ));

            console.log('Grocery updated successfully!');
        } catch (err) {
            console.error('Error updating grocery:', err);
            setError('Failed to update grocery. Please try again.');
            loadGroceries();
        } finally {
            setActionLoading(false);
        }
    };

    const handleDeleteGrocery = async (id) => {
        try {
            setActionLoading(true);
            setError(null);
            await groceryService.deleteGrocery(id);

            // Remove from local state
            setGroceries(groceries.filter(g => g.id !== id));

            console.log('Grocery deleted successfully!');
        } catch (err) {
            console.error('Error deleting grocery:', err);
            setError('Failed to delete grocery. Please try again.');
            loadGroceries();
        } finally {
            setActionLoading(false);
        }
    };

    // ========== RENDER ==========

    if (loading) {
        return (
            <div>
                <h2>My Grocery List</h2>
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div>
            <h2>My Grocery List</h2>

            {error && (
                <div className="error-banner">
                    <strong>Error:</strong> {error}
                    <button onClick={loadGroceries}>Retry</button>
                </div>
            )}

            <GroceryForm onSubmit={handleAddGrocery} />

            {actionLoading && <div>Processing...</div>}

            {groceries.length === 0 ? (
                <div className="empty-state">
                    <p>No groceries yet!</p>
                    <p>Add your first item using the form above.</p>
                </div>
            ) : (
                <div>
                    <h3>Items ({groceries.length})</h3>
                    {groceries.map(grocery => (
                        <GroceryItem
                            key={grocery.id}
                            grocery={grocery}
                            onDelete={handleDeleteGrocery}
                            onUpdate={handleUpdateGrocery}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default GroceryList;