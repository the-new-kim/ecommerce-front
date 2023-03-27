import { onAuthStateChanged, signOut, User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userAtom } from "./libs/atoms";
import { firebaseAuth, userCollection } from "./firebase/config";

import { updateFirebaseDoc } from "./firebase/utils";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AnimatePresence, motion } from "framer-motion";

import InitLoader from "./components/loaders/InitLoader";
import { fadeInOutVariants } from "./libs/variants";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IUser } from "./firebase/types";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);
  const [me, setMe] = useRecoilState(userAtom);
  const [introEnded, setIntroEnded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const { uid, displayName, email, phoneNumber, photoURL } = JSON.parse(
          JSON.stringify(user)
        ) as User; //https://github.com/firebase/firebase-js-sdk/issues/5722 📝 Firebase Recoil Issue...
        if (!me) {
          //1️⃣ SignIn or Registration

          const docRef = doc(userCollection, uid);
          const docSnap = await getDoc(docRef);

          const userDocExists = docSnap.exists();
          if (userDocExists) {
            //1️⃣-1️⃣ setMe if userDoc exists

            setMe({
              ...docSnap.data(),
              id: docSnap.id,
            });
          } else {
            //1️⃣-2️⃣ create user doc

            const newUserDocData: IUser = {
              displayName: displayName || null,
              email: email || null,
              phoneNumber: phoneNumber || null,
              photoURL: photoURL || null,
              isAdmin: false,
              wishlist: [],
              cart: {
                paymentIntent: null,
                products: [],
              },
              orders: [],
              address: null,
              shipping: null,
            };

            await setDoc(doc(userCollection, uid), newUserDocData);
            setMe({ ...newUserDocData, id: uid });
          }
        } else {
          //2️⃣ Update User doc

          if (me.id === uid) {
            await updateFirebaseDoc(userCollection, uid, {
              ...me,
            });
          }
        }
      } else {
        signOut(firebaseAuth);
        setMe(null);
      }
      setFirebaseInit(true);
    });

    return () => unsubscribe();
  }, [me]);

  return (
    <AnimatePresence mode="wait">
      {firebaseInit && introEnded ? (
        <motion.div
          key="main"
          variants={fadeInOutVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
        >
          <RouterProvider router={router(me)} />
        </motion.div>
      ) : (
        <InitLoader key="loading" setState={setIntroEnded} text="Toy shop" />
      )}
    </AnimatePresence>
  );
}

export default App;
