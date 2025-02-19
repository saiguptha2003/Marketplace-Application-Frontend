export interface User {
  username: string;
}

export interface Product {
  id: string;
  Price: number;
  "Image URL": string;
  Name: string;
  Description: string;
  userId: string;
  productId: string;
  created_at: string;
}

export interface Order {
  id: string;
  productId: string;
  orderId: string;
  userId: string;
  status: string;
  productDetails: Product;
  created_at: string;
}