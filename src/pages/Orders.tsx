import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/api';
import { Order } from '../types';
import toast from 'react-hot-toast';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        toast.error('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <img
                src={order.productDetails["Image URL"]}
                alt={order.productDetails.Name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{order.productDetails.Name}</h2>
                <p className="text-gray-600">{order.productDetails.Description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lg font-bold">${order.productDetails.Price}</span>
                  <span className="px-3 py-1 rounded-full text-sm capitalize bg-blue-100 text-blue-800">
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Ordered on: {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;