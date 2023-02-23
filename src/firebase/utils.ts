import { QueryFunctionContext } from "@tanstack/react-query";
import { UserCredential } from "firebase/auth";
import {
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  UpdateData,
  updateDoc,
} from "firebase/firestore";
import { IProductWithId } from "../routes/Cart";
import { productCollection, userCollection } from "./config";
import { ICartProduct } from "./types";

export const errorMessage = (error: unknown) => {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = error + "";
  }
  throw new Error(message);
};

export const updateFirebaseDoc = async <T>(
  collection: CollectionReference<T>,
  id: string,
  data: UpdateData<T>
) => {
  const docRef = doc(collection, id);
  await updateDoc(docRef, data);
};

export const getFirebaseDoc = async <T>(
  collection: CollectionReference<T>,
  id: string | undefined
) => {
  try {
    const docRef = doc(collection, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error(`No document with id "${id}" found`);

    return { ...docSnap.data(), id: docSnap.id };
  } catch (error) {
    errorMessage(error);
  }
};

export const getFirebaseDocs = async <T>(
  collection: CollectionReference<T>,
  ...queryConstraints: QueryConstraint[]
) => {
  try {
    const q = query(collection, ...queryConstraints);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  } catch (error) {
    errorMessage(error);
  }
};

export const createUserDoc = async (userCredential: UserCredential) => {
  await setDoc(doc(userCollection, userCredential.user.uid), {
    isAdmin: false,
    wishlist: [],
    cart: {
      paymentIntent: null,
      products: [],
    },
    orders: [],
    address: null,
    shipping: null,
  });
};

export const getWishlistProducts = async (wishlist: string[] | undefined) => {
  const products: IProductWithId[] = [];

  if (!wishlist) return products;

  for (let i = 0; i < wishlist.length; i++) {
    const id = wishlist[i];
    const foundProduct = await getFirebaseDoc(productCollection, id);
    if (!foundProduct) return;

    products.push(foundProduct);
  }

  return products;
};

export const getCartProducts = async (
  cartProducts: ICartProduct[] | undefined
) => {
  let products: IProductWithId[] = [];

  if (!cartProducts) return products;

  for (let i = 0; i < cartProducts.length; i++) {
    const { id, quantity } = cartProducts[i];
    const foundProduct = await getFirebaseDoc(productCollection, id);

    if (foundProduct) {
      const cartProduct = {
        ...foundProduct,
        quantity,
      };
      products.push(cartProduct);
    }
  }

  return products;
};

export const getProductsTotalAmount = (products: IProductWithId[]) =>
  Math.round(
    products
      .map((product) => product.price * product.quantity)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
  );

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

// export const getProductsById = async (id: string) => {
//   let results: IProductResult[] = [];
//   const q = query(collection(firebaseDB, "products"), where("id", "==", id));

//   try {
//     const querySnapshot = await getDocs(q);

//     const allProducts = querySnapshot.docs.map((doc) => {
//       return {
//         ...doc.data(),
//         id: doc.id,
//       } as IProductResult;
//     });

//     results = allProducts;
//   } catch (error) {
//     console.log(error);
//   }

//   return results;
// };

// export const getProductsByMultipleIds = async (ids: string[]) => {
//   const results: IProductResult[] = [];

//   for (let i = 0; i < ids.length; i++) {
//     try {
//       const docRef = doc(firebaseDB, "products", ids[i]);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         results.push(docSnap.data() as IProductResult);
//       } else {
//         return;
//       }
//     } catch (error) {
//       console.log("ERROR:::", error);
//     }
//   }

//   return results;
// };

//GET USERS ⚠️ Auth & Users collection

// interface IUserData {
//   uid: User["uid"];
//   displayName: User["displayName"];
//   photoURL: User["photoURL"];
//   email: User["email"];
//   phoneNumber: User["phoneNumber"];
//   isAdmin: boolean;
//   wishlist: string[];
//   cart: string[];
//   orders: string[];
// }

// export const getUserData = async (uid: string) => {
//   const q = query(collection(firebaseDB, "users"), where("uid", "==", uid));

//   const querySnapshot = await getDocs(q);

//   return {
//     ...querySnapshot.docs[0].data(),
//   } as IUserData;
// };
