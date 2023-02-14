import {
  CollectionReference,
  doc,
  getDoc,
  getDocs,
  query,
  UpdateData,
  updateDoc,
} from "firebase/firestore";

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
  id: string
) => {
  const docRef = doc(collection, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return;

  return { ...docSnap.data(), id: docSnap.id };
};

export const getFirebaseDocs = async <T>(
  collection: CollectionReference<T>
) => {
  const q = query(collection);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
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
