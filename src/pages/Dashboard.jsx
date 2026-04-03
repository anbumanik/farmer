import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Edit, Package, DollarSign } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useProductStore } from '../store/productStore';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { farmerProducts, fetchFarmerProducts, addProduct, deleteProduct, isLoading } = useProductStore();
  const navigate = useNavigate();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', quantity: '', category: 'SEEDS', image: ''
  });

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access the dashboard');
      navigate('/');
    } else {
      fetchFarmerProducts();
    }
  }, [user, navigate, fetchFarmerProducts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });
      toast.success('Product added successfully!');
      setIsAddModalOpen(false);
      setFormData({ name: '', price: '', quantity: '', category: 'SEEDS', image: '' });
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted!');
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  if (!user) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Farmer Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center">
              <div className="bg-[#eaf5ef]/30 p-4 rounded-full mr-4 text-[#D4AF37]">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{farmerProducts.length}</p>
              </div>
            </div>
            {/* Can add more stats based on orders later */}
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-gray-800">My Products</h2>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#D4AF37] hover:bg-[#166534] text-white px-4 py-2 rounded-lg font-medium shadow flex items-center gap-2 transition"
            >
              <Plus size={18} /> Add New Product
            </button>
          </div>

          {isLoading ? (
             <div className="p-10 text-center text-gray-500">Loading products...</div>
          ) : farmerProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price/kg</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock (kg)</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {farmerProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-lg object-cover" src={product.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#eaf5ef]/30 text-[#166534]">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ₹{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                <Package size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No products yet</h3>
              <p className="text-gray-500">Get started by adding your first product.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Add New Product</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price (₹ per kg)</label>
                  <input type="number" name="price" required min="1" value={formData.price} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity available (kg)</label>
                  <input type="number" name="quantity" required min="1" value={formData.quantity} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-md">
                  <option>SEEDS</option>
                  <option>CROP NUTRITION</option>
                  <option>CROP PROTECTION</option>
                  <option>GARDEN CARE</option>
                  <option>BUY 1 GET 1 FREE</option>
                  <option>SUPER COMBO</option>
                  <option>AGRI EQUIPMENT</option>
                  <option>IRRIGATION</option>
                  <option>TOP BRANDS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="url" name="image" required value={formData.image} onChange={handleChange} placeholder="https://..." className="mt-1 block w-full px-3 py-2 border rounded-md" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button>
                <button type="submit" disabled={isLoading} className="px-4 py-2 text-white bg-[#D4AF37] rounded-md hover:bg-[#166534]">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
