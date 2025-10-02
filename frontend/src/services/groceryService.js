import axios from 'axios';

// Base URL
const API_BASE_URL = "http://localhost:8080/api/grocery";

// API instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 5000
});

// API Methods
const groceryService = {
    // GET /api/grocery/all
    getAll: async () => {
        const response = await api.get('/all');
        return response.data;
    },

    // GET /api/grocery/{id}
    getById: async (id) => {
        const response = await api.get('/{id}', id);
        return response.data;
    },

    // POST /api/grocery/add
    addGrocery: async (grocery) => {
        const response = await api.post('/add', grocery);
        return response.data;
    },

    // PUT /api/grocery/{id}
    updateGrocery: async (id, grocery) => {
        const response = await api.put(`/${id}`,  grocery);
        return response.data;
    },

    // DELETE /api/grocery/{id}
    deleteGrocery: async(id) => {
        const response = await api.delete(`/${id}`);
        return response.data;
    }
};

export default groceryService;