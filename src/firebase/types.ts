import { User } from "firebase/auth";

export interface IFirebasDoc {
  id: string;
}

export interface IUserDoc extends IFirebasDoc {
  isAdmin: boolean;
  wishlist: string[];
  cart: ICartProduct[];
  orders: string[];
}

export interface ICartProduct {
  productId: string;
  quantity: number;
}

export interface IProductDoc extends IFirebasDoc {
  title: string;
  label: string;
  description: string;
  quantity: number;
  price: number;
  categoryId: string;
  imageUrls: string[];
  active: boolean;
  sold: number;
}
export interface IOrderDoc extends IFirebasDoc {
  products: ICartProduct[];
  orderer: string;
  shipping: IShipping;
  total: number;
}

export interface IAddress {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
  state: string;
}

export interface IShipping {
  address: IAddress;
  name: string;
  phone: string;
}
