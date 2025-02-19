import React, { useEffect, useState } from 'react';
import { getUserProducts, deleteUserProduct, updateUserProduct, addUserProduct } from '../services/api';
import { Product } from '../types';
import toast from 'react-hot-toast';

const MyProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<{ Name: string; Description: string; Price: number; ImageUrl: string }>({
    Name: '',
    Description: '',
    Price: 0,
    ImageUrl: '',
  });

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const fetchUserProducts = async () => {
    try {
      const data = await getUserProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch your products');
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteUserProduct(productId);
      fetchUserProducts();
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete the product');
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedProduct: Product) => {
    try {
      const productData = {
        Price: updatedProduct.Price,
        Name: updatedProduct.Name,
        Description: updatedProduct.Description,
      };

      await updateUserProduct(updatedProduct.productId, productData);
      setProducts(products.map(product => (product.productId === updatedProduct.productId ? updatedProduct : product)));
      toast.success('Product updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update the product');
    }
  };

  const handleAddProduct = async () => {
    try {
      const productData = {
        name: newProduct.Name,
        description: newProduct.Description,
        price: newProduct.Price,
        imageUrl: newProduct.ImageUrl,
      };
      console.log(productData);
      await addUserProduct(productData);
      fetchUserProducts();
      toast.success('Product added successfully');
      setIsAddModalOpen(false);
      setNewProduct({ Name: '', Description: '', Price: 0, ImageUrl: '' });
    } catch (error) {
      toast.error('Failed to add the product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Products</h1>
      <button 
        className="bg-green-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-700"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Product
      </button>
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
                <div className="space-x-2">
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button 
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={() => handleDelete(product.productId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
            <input
              type="text"
              value={currentProduct.Name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Name: e.target.value })}
              className="border p-2 mb-4 w-full"
              placeholder="Product Name"
            />
            <input
              type="text"
              value={currentProduct.Description}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Description: e.target.value })}
              className="border p-2 mb-4 w-full"
              placeholder="Product Description"
            />
            <input
              type="number"
              value={currentProduct.Price}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Price: parseFloat(e.target.value) })}
              className="border p-2 mb-4 w-full"
              placeholder="Product Price"
            />
            <div className="flex justify-end">
              <button 
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleUpdate(currentProduct)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Product</h2>
            <input
              type="text"
              value={newProduct.Name}
              onChange={(e) => setNewProduct({ ...newProduct, Name: e.target.value })}
              className="border p-2 mb-4 w-full"
              placeholder="Product Name"
            />
            <input
              type="text"
              value={newProduct.Description}
              onChange={(e) => setNewProduct({ ...newProduct, Description: e.target.value })}
              className="border p-2 mb-4 w-full"
              placeholder="Product Description"
            />
            <input
              type="number"
              value={newProduct.Price}
              onChange={(e) => setNewProduct({ ...newProduct, Price: parseFloat(e.target.value) })}
              className="border p-2 mb-4 w-full"
              placeholder="Product Price"
            />
            <input
              type="text"
              value={newProduct.ImageUrl}
              onChange={(e) => setNewProduct({ ...newProduct, ImageUrl: e.target.value })}
              className="border p-2 mb-4 w-full"
              placeholder="Image URL"
            />
            <div className="flex justify-end">
              <button 
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts;