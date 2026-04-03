import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const useProductStore = create((set, get) => ({
  products: [],
  farmerProducts: [],
  isLoading: false,
  error: null,

  fetchProducts: async (category = '', search = '') => {
    set({ isLoading: true, error: null });
    
    // Comprehensive dummy data with images for all categories
    const DUMMY_PRODUCTS = [
      { _id: 'd1',  name: 'Premium Hybrid Tomato Seeds',   price: 250,  originalPrice: 300,  image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=300&q=80', category: 'SEEDS',            farmer: { name: 'Kisan Seed Co' } },
      { _id: 'd2',  name: 'Organic Urea Fertilizer',         price: 450,  originalPrice: 500,  image: 'https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&w=300&q=80', category: 'CROP NUTRITION',   farmer: { name: 'AgroFert' } },
      { _id: 'd3',  name: 'Neem Oil Pesticide 1L',           price: 380,  originalPrice: 450,  image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&w=300&q=80', category: 'CROP PROTECTION', farmer: { name: 'EcoSafe' } },
      { _id: 'd4',  name: 'Heavy Duty Pruning Shears',       price: 550,  originalPrice: 700,  image: 'https://images.unsplash.com/photo-1416879598555-ea237a6b99de?auto=format&fit=crop&w=300&q=80', category: 'GARDEN CARE',      farmer: { name: 'Tools Pro' } },
      { _id: 'd5',  name: 'Drip Irrigation Kit',             price: 1200, originalPrice: 1500, image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=300&q=80', category: 'IRRIGATION',       farmer: { name: 'AquaFarm' } },
      { _id: 'd6',  name: 'Super Yield Wheat Seeds',         price: 150,  originalPrice: 180,  image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=300&q=80', category: 'SEEDS',            farmer: { name: 'Bharat Seeds' } },
      { _id: 'd7',  name: 'Apple BOGO Deals',                price: 120,  originalPrice: 240,  image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80', category: 'BUY 1 GET 1 FREE', farmer: { name: 'Green Orchards' } },
      { _id: 'd8',  name: 'Farmer Starter Super Combo',      price: 2999, originalPrice: 3500, image: 'https://images.unsplash.com/photo-1595841696650-6f0dc0cb9ea2?auto=format&fit=crop&w=300&q=80', category: 'SUPER COMBO',     farmer: { name: 'Farmigo Tech' } },
      { _id: 'd9',  name: 'Tractor Attachments Set',         price: 8500, originalPrice: 9000, image: 'https://images.unsplash.com/photo-1588612196620-e4c19edfcb7f?auto=format&fit=crop&w=300&q=80', category: 'AGRI EQUIPMENT',  farmer: { name: 'Heavy Machinery' } },
      { _id: 'd10', name: 'Top Brand Bio-Fertilizer',        price: 600,  originalPrice: 650,  image: 'https://images.unsplash.com/photo-1523348837708-15d4a0981e0a?auto=format&fit=crop&w=300&q=80', category: 'TOP BRANDS',      farmer: { name: 'IFFCO' } },
      { _id: 'd11', name: 'Sunflower Seeds Max Yield',       price: 180,  originalPrice: 220,  image: 'https://images.unsplash.com/photo-1500937386664-56d1dfac0954?auto=format&fit=crop&w=300&q=80', category: 'SEEDS',            farmer: { name: 'Sun Farms' } },
      { _id: 'd12', name: 'Premium NPK Fertilizer',          price: 850,  originalPrice: 900,  image: 'https://images.unsplash.com/photo-1495908333425-29a1e0f6ef29?auto=format&fit=crop&w=300&q=80', category: 'CROP NUTRITION',   farmer: { name: 'NutriCrop' } },
      { _id: 'd13', name: 'Garden Hand Trowel',              price: 299,  originalPrice: 350,  image: 'https://images.unsplash.com/photo-1586201375761-94cce203a3d5?auto=format&fit=crop&w=300&q=80', category: 'GARDEN CARE',      farmer: { name: 'Green Tools' } },
      { _id: 'd14', name: 'Mango Saplings BOGO',             price: 450,  originalPrice: 900,  image: 'https://images.unsplash.com/photo-1505471768190-275e2ad7b3f9?auto=format&fit=crop&w=300&q=80', category: 'BUY 1 GET 1 FREE', farmer: { name: 'Orchard Masters' } },
      { _id: 'd15', name: 'Micro-Sprinkler Setup',           price: 1500, originalPrice: 1800, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=300&q=80', category: 'IRRIGATION',       farmer: { name: 'AquaFarm' } },
      { _id: 'd16', name: 'Organic Fungicide Spray',         price: 450,  originalPrice: 500,  image: 'https://images.unsplash.com/photo-1530836369250-ef71a3f5e43d?auto=format&fit=crop&w=300&q=80', category: 'CROP PROTECTION', farmer: { name: 'EcoSafe' } },
      { _id: 'd17', name: 'Mega Garden Combo',               price: 1200, originalPrice: 1600, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=300&q=80', category: 'SUPER COMBO',     farmer: { name: 'Garden Experts' } },
      { _id: 'd18', name: 'Pesticide Sprayer Pump',          price: 3200, originalPrice: 3500, image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=300&q=80', category: 'AGRI EQUIPMENT',  farmer: { name: 'AgriMech' } },
      { _id: 'd19', name: 'Corn Seeds Pro',                  price: 190,  originalPrice: 250,  image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80', category: 'SEEDS',            farmer: { name: 'Bharat Seeds' } },
      { _id: 'd20', name: 'Rose Plant Care Kit',             price: 350,  originalPrice: 400,  image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80', category: 'GARDEN CARE',      farmer: { name: 'Flower Power' } },
      { _id: 'd21', name: 'High Yield Cotton Seeds',         price: 600,  originalPrice: 700,  image: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80', category: 'SEEDS',            farmer: { name: 'Cotton Growers' } },
      { _id: 'd22', name: 'Weed Control Chemical',           price: 800,  originalPrice: 950,  image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=300&q=80', category: 'CROP PROTECTION', farmer: { name: 'SafeCrop' } },
      { _id: 'd23', name: 'Banana Tree Promo Deals',         price: 200,  originalPrice: 400,  image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=300&q=80', category: 'BUY 1 GET 1 FREE', farmer: { name: 'Tropical Farms' } },
      { _id: 'd24', name: 'Farm Boots Heavy Duty',           price: 900,  originalPrice: 1200, image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=300&q=80', category: 'AGRI EQUIPMENT',  farmer: { name: 'FarmWear' } },
      { _id: 'd25', name: 'Inline Drip Tube 100m',           price: 2500, originalPrice: 3000, image: 'https://images.unsplash.com/photo-1620053444817-6c0f40d78e88?auto=format&fit=crop&w=300&q=80', category: 'IRRIGATION',       farmer: { name: 'AquaPro' } },
      { _id: 'd26', name: 'Soil Conditioner Pack',           price: 350,  originalPrice: 400,  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=80', category: 'CROP NUTRITION',   farmer: { name: 'NutriCrop' } },
      { _id: 'd27', name: 'Starter Kit Combo Pack',          price: 1500, originalPrice: 1800, image: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=300&q=80', category: 'SUPER COMBO',     farmer: { name: 'Beginner Agri' } },
      { _id: 'd28', name: 'Root Growth Harmonizer',          price: 550,  originalPrice: 600,  image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=300&q=80', category: 'CROP PROTECTION', farmer: { name: 'BioGuard' } },
      { _id: 'd29', name: 'Wheat Premium Seeds',             price: 220,  originalPrice: 280,  image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=300&q=80', category: 'SEEDS',            farmer: { name: 'Golden Harvest' } },
      { _id: 'd30', name: 'Irrigation Valve Pro',            price: 450,  originalPrice: 500,  image: 'https://images.unsplash.com/photo-1416879598555-ea237a6b99de?auto=format&fit=crop&w=300&q=80', category: 'IRRIGATION',       farmer: { name: 'AquaPro' } },
    ];

    try {
      let url = `${API_URL}/products`;
      const queryParams = [];
      if (category && category !== 'All') queryParams.push(`category=${category}`);
      if (search) queryParams.push(`search=${search}`);
      
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }
      
      const response = await axios.get(url);
      if (response.data && response.data.length > 0) {
        set({ products: response.data, isLoading: false });
      } else {
        // Filter dummy products properly acting like a backend
        let filtered = DUMMY_PRODUCTS;
        if (category && category !== 'All') {
           filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase() || p.category.includes(category));
        }
        if (search) {
           filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
        }
        set({ products: filtered, isLoading: false });
      }
    } catch (error) {
      let filtered = DUMMY_PRODUCTS;
      if (category && category !== 'All') {
         filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase() || p.category.includes(category));
      }
      if (search) {
         filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
      }
      set({ products: filtered, error: error.response?.data?.message || null, isLoading: false });
    }
  },

  fetchFarmerProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('Not authenticated');

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const response = await axios.get(`${API_URL}/products/farmer/my-products`, config);
      set({ farmerProducts: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch farmer products', isLoading: false });
    }
  },

  addProduct: async (productData) => {
    set({ isLoading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const response = await axios.post(`${API_URL}/products`, productData, config);
      set((state) => ({ 
        farmerProducts: [...state.farmerProducts, response.data],
        products: [...state.products, response.data],
        isLoading: false 
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add product', isLoading: false });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.delete(`${API_URL}/products/${id}`, config);
      set((state) => ({ 
        farmerProducts: state.farmerProducts.filter(p => p._id !== id),
        products: state.products.filter(p => p._id !== id),
        isLoading: false 
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete product', isLoading: false });
      throw error;
    }
  }
}));
