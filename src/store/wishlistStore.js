import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      toggleWishlist: (product) => {
        const { wishlist } = get();
        const exists = wishlist.find(item => item._id === product._id);
        
        if (exists) {
          set({ wishlist: wishlist.filter(item => item._id !== product._id) });
        } else {
          set({ wishlist: [...wishlist, product] });
        }
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(item => item._id === productId);
      },
      
      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'wishlist-storage', // unique name
    }
  )
);
