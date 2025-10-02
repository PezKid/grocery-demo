import React, { useState } from 'react';

function GroceryItem({ grocery, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(grocery.name);
    const [editQuantity, setEditQuantity] = useState(grocery.quantity);

    const handleUpdate = () => {
        onUpdate(grocery.id, { name: editName, quantity: parseInt(editQuantity) });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditName(grocery.name);
        setEditQuantity(grocery.quantity);
        setIsEditing(false);
    };

    if (isEditing) {
        // Edit mode
        return (
            <div className="grocery-item editing">
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                />
                <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                    min="1"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        );
    }

    // Display mode
    return (
        <div className="grocery-item">
            <div>
                <strong>{grocery.name}</strong>
                <span> - Quantity: {grocery.quantity}</span>
            </div>
            <div>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => {
                    if (window.confirm(`Delete "${grocery.name}"?`)) {
                        onDelete(grocery.id);
                    }
                }}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default GroceryItem;