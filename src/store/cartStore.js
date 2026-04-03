import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useCartStore = create((set, get) => ({
  cart: [],
  isLoading: false,
  error: null,

  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return; // Don't fetch if not logged in

      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(`${API_URL}/cart`, config);
      set({ cart: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch cart', isLoading: false });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('Not logged in');

      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.post(`${API_URL}/cart`, { productId, quantity }, config);
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add to cart', isLoading: false });
      throw error;
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.put(`${API_URL}/cart/${productId}`, { quantity }, config);
      set({ cart: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update quantity' });
      throw error;
    }
  },

  removeFromCart: async (productId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.delete(`${API_URL}/cart/${productId}`, config);
      set({ cart: response.data });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to remove from cart' });
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${API_URL}/cart`, config);
      set({ cart: [] });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to clear cart' });
      throw error;
    }
  }
}));
