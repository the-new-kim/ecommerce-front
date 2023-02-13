import { User } from "firebase/auth";
import { atom } from "recoil";
import { IUserDoc } from "../firebase/types";

export interface IUserAtom extends IUserDoc {
  displayName: User["displayName"];
  photoURL: User["photoURL"];
  email: User["email"];
  phoneNumber: User["phoneNumber"];
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
