import React, { useEffect, useState } from 'react';
import { getAllProducts, createOrder } from '../services/api';
import { Product } from '../types';
import toast from 'react-hot-toast';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  const handleOrder = async () => {
    try {
      await createOrder({ productId: selectedProductId });
      toast.success('Order created successfully');
      setIsOrderModalOpen(false);
    } catch (error) {
      toast.error('Failed to create order');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product["Image URL"]}
              alt={product.Name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.Name}</h2>
              <p className="text-gray-600 mb-4">{product.Description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${product.Price}</span>
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => {
                    setSelectedProductId(product.productId);
                    setIsOrderModalOpen(true);
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Confirmation Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
            <p className="mb-4">Are you sure you want to place this order?</p>
            <div className="flex justify-end">
              <button 
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setIsOrderModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={handleOrder}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;