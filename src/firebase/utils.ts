import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { IProduct } from "../routes/Home";
import { firebaseDB } from "./config";

export const getProducts = async () => {
  let results: IProduct[] = [];
  const q = query(collection(firebaseDB, "products"));

  const querySnapshot = await getDocs(q);

  const allProducts = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    } as IProduct;
  });

  results = allProducts;

  return results;
};

//////////
//////////
//////////
//////////
//////////

export const getFirebaseDoc = async <T>(name: string, id: string) => {
  const docRef = doc(firebaseDB, name, id);
  const docSnap = await getDoc(docRef);

  return { ...docSnap.data(), id: docSnap.id } as T;
};

export const getFirebaseDocs = async <T>(name: string) => {
  const q = query(collection(firebaseDB, name));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    } as T;
  });
};

///////////
///////////
///////////
///////////
///////////

export const getProductsById = async (id: string) => {
  let results: IProduct[] = [];
  const q = query(collection(firebaseDB, "products"), where("id", "==", id));

  try {
    const querySnapshot = await getDocs(q);

    const allProducts = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as IProduct;
    });

    results = allProducts;
  } catch (error) {
    console.log(error);
  }

  return results;
};

export const getProductsByMultipleIds = async (ids: string[]) => {
  const results: IProduct[] = [];

  for (let i = 0; i < ids.length; i++) {
    try {
      const docRef = doc(firebaseDB, "products", ids[i]);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        results.push(docSnap.data() as IProduct);
      } else {
        return;
      }
    } catch (error) {
      console.log("ERROR:::", error);
    }
  }

  return results;
};

//GET USERS ⚠️ Auth & Users collection

interface IUserData {
  uid: User["uid"];
  displayName: User["displayName"];
  photoURL: User["photoURL"];
  email: User["email"];
  phoneNumber: User["phoneNumber"];
  isAdmin: boolean;
  wishlist: string[];
  cart: string[];
  orders: string[];
}

export const getUserData = async (uid: string) => {
  const q = query(collection(firebaseDB, "users"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  return {
    ...querySnapshot.docs[0].data(),
  } as IUserData;
};
