import { User } from "firebase/auth";
import { atom } from "recoil";

export interface ICartProduct {
  productId: string;
  quantity: number;
}

export interface IOrder {
  products: ICartProduct[];
  orderer: string;
  shipping: boolean;
  total: number;
}

export interface IMe {
  uid: User["uid"];
  displayName: User["displayName"];
  photoURL: User["photoURL"];
  email: User["email"];
  phoneNumber: User["phoneNumber"];
  isAdmin: boolean;
  wishlist: string[];
  cart: ICartProduct[];
  orders: string[];
}

export const meAtom = atom<IMe | null>({
  key: "userState",
  default: null,
});

export const headerHeightAtom = atom<number>({
  key: "headerHeightState",
  default: 0,
});

export const checkoutOptionAtom = atom<object | null>({
  key: "checkoutOptionState",
  default: null,
});
