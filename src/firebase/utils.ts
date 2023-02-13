import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { firebaseDB, firebaseStorage } from "./config";
import { IProductDoc } from "./types";

export const getProducts = async () => {
  let results: IProductDoc[] = [];
  const q = query(collection(firebaseDB, "products"));

  const querySnapshot = await getDocs(q);

  const allProducts = querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    } as IProductDoc;
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

  if (!docSnap.exists()) return;

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

// export const uploadImages = async (attachments: string[], path: string) => {
//   try {
//     for (let i = 0; i < attachments.length; i++) {
//       const fileRef = ref(firebaseStorage, `${path}/${uuidv4()}`);
//       const response = await uploadString(fileRef, attachments[i], "data_url");
//     }
//   } catch (error) {
//     console.log("ERROR:::", error);
//   }
// };

// export const getFirestoreUrls = async (attachments: string[], path: string) => {
//   const downloadUrls = [];

//   if (!!attachments.length) {
//     try {
//       for (let i = 0; i < attachments.length; i++) {
//         const fileRef = ref(firebaseStorage, `${path}/${uuidv4()}`);
//         const response = await uploadString(
//           fileRef,
//           attachments[i],
//           "data_url"
//         );
//         const downloadUrl = await getDownloadURL(response.ref);
//         downloadUrls.push(downloadUrl);
//       }
//     } catch (error) {
//       console.log("ERROR:::", error);
//     }
//   }

//   return downloadUrls;
// };

///////////

export const getProductsById = async (id: string) => {
  let results: IProductDoc[] = [];
  const q = query(collection(firebaseDB, "products"), where("id", "==", id));

  try {
    const querySnapshot = await getDocs(q);

    const allProducts = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as IProductDoc;
    });

    results = allProducts;
  } catch (error) {
    console.log(error);
  }

  return results;
};

export const getProductsByMultipleIds = async (ids: string[]) => {
  const results: IProductDoc[] = [];

  for (let i = 0; i < ids.length; i++) {
    try {
      const docRef = doc(firebaseDB, "products", ids[i]);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        results.push(docSnap.data() as IProductDoc);
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
