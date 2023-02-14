export interface IUser {
  isAdmin: boolean;
  wishlist: string[];
  cart: ICart;
  orders: string[];
  address: IAddress | null;
  shipping: IShipping | null;
}

export interface ICart {
  paymentIntent: string | null;
  products: ICartProduct[];
}

export interface ICartProduct {
  id: string;
  quantity: number;
}

export interface IProduct {
  title: string;
  description: string;
  quantity: number;
  price: number;
  imageUrls: string[];
  active: boolean;
  sold: number;
}

export interface IOrder {
  products: ICartProduct[];
  orderer: string;
  shipping: IShipping;
  paymentIntent: string;
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
