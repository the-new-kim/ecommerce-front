import { atom } from "recoil";
import { IUser } from "../firebase/types";

export interface IUserAtom extends IUser {
  id: string;
}

export const userAtom = atom<IUserAtom | null>({
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

export const fireworksAtom = atom<boolean>({
  key: "fireworksState",
  default: false,
});

export const cartAtom = atom({
  key: "cartState",
  default: null,
});

export const wishlistAtom = atom({
  key: "wishlistState",
  default: null,
});
