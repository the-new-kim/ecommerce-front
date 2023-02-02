import { User } from "firebase/auth";
import { atom } from "recoil";

export interface IMe {
  uid: User["uid"];
  displayName: User["displayName"];
  photoURL: User["photoURL"];
  email: User["email"];
  phoneNumber: User["phoneNumber"];
  isAdmin: boolean;
}

export const meAtom = atom<IMe | null>({
  key: "userState",
  default: null,
});
