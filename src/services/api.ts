import axios from 'axios';
import { Product } from '../types';

const API_URL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (username: string, email: string, password: string) => {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  console.log(response.data);
  return response.data;

};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getUserProducts = async () => {
  const response = await api.get('/user-products/products');
  console.log(response.data);
  return response.data;
};

export const getAllProducts = async () => {
  const response = await api.get('/products');
  console.log(response.data);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await api.get('/orders/user-orders');
  console.log(response.data);
  return response.data;
};
export const deleteUserProduct = async (productId: string) => {
  const response = await api.delete(`/user-products/product/${productId}`);
  console.log(response.data);
  return response.data;
};

export const updateUserProduct = async (productId: string, productData: { Price: number; Name: string; Description: string; }) => {
  const response = await api.put(`/user-products/product/${productId}`, productData);
  return response.data;
};

export const addUserProduct = async (productData: { Name: string; Description: string; Price: number; ImageUrl: string }) => {
  const response = await api.post('/user-products/add-product', productData);
  return response.data;
};

export const createOrder = async (orderData: { productId: string }) => {
  const response = await api.post('/orders/create-order', orderData);
  return response.data;
};