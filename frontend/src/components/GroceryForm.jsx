import React, { useState } from 'react';

function GroceryForm({ onSubmit, initialData = null, isEditing = false }) {
    const [name, setName] = useState(initialData?.name || '');
    const [quantity, setQuantity] = useState(initialData?.quantity || 1);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            setError('Name is required');
            return;
        }

        if (quantity < 1) {
            setError('Quantity must be at least 1');
            return;
        }

        // Clear error and call parent's submit handler
        setError('');
        onSubmit({ name: name.trim(), quantity: parseInt(quantity) });

        // Reset form if adding (not editing)
        if (!isEditing) {
            setName('');
            setQuantity(1);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{isEditing ? 'Edit Grocery' : 'Add New Grocery'}</h3>

            {error && <div className="error">{error}</div>}

            <div>
                <label>Item Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Milk"
                />
            </div>

            <div>
                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                />
            </div>

            <button type="submit">
                {isEditing ? 'Update' : 'Add'} Grocery
            </button>
        </form>
    );
}

export default GroceryForm;