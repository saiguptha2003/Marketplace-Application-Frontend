import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, LogOut, Store, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/api';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const { isAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8 items-center">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-gray-100">
              <Store className="h-6 w-6" />
              <span className="font-bold text-xl">Product-Order Management System</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/products" className="flex items-center space-x-1 text-white hover:text-gray-100">
                  <Package className="h-5 w-5" />
                  <span>Products</span>
                </Link>
                <Link to="/my-products" className="flex items-center space-x-1 text-white hover:text-gray-100">
                  <Store className="h-5 w-5" />
                  <span>My Products</span>
                </Link>
                <Link to="/orders" className="flex items-center space-x-1 text-white hover:text-gray-100">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Orders</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-white hover:text-gray-100"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Link 
                    to="/login" 
                    className="flex items-center space-x-1 text-white hover:text-gray-100 px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
                {location.pathname !== '/register' && (
                  <Link 
                    to="/register" 
                    className="flex items-center space-x-1 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Register</span>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;