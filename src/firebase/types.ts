import { TPaymentStatusTypes } from "../api/paymentIntents";

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
  createdAt: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  imageUrls: string[];
  active: boolean;
  sold: number;
}

export enum EDeliveryStatus {
  ORDERED = "ordered",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
}

export interface IDelivery {
  status: EDeliveryStatus;
  trackingCode: string | null;
}

export interface IOrder {
  createdAt: number;
  products: ICartProduct[];
  orderer: string;
  shipping: IShipping;
  paymentIntent: {
    id: string;
    status: TPaymentStatusTypes;
    amount: number;
  };
  delivery: IDelivery;
  // trackingCode:string | null
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

export interface IReview {
  product: string;
  owner: string;
  title: string;
  text: string;
  rating: number;
}

export interface IReviewWithId extends IReview {
  id: string;
}
