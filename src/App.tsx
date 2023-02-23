import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IUserAtom, userAtom } from "./libs/atoms";
import { firebaseAuth, userCollection } from "./firebase/config";

import { getFirebaseDoc, updateFirebaseDoc } from "./firebase/utils";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AnimatePresence, motion } from "framer-motion";

import Loading from "./components/Loading";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);
  const [me, setUser] = useRecoilState(userAtom);
  const [introEnded, setIntroEnded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user)) as User; //https://github.com/firebase/firebase-js-sdk/issues/5722 📝 Firebase Recoil Issue...

        const userDoc = await getFirebaseDoc(userCollection, userCopy.uid);

        if (userDoc) {
          const { isAdmin, wishlist, cart, orders, address, shipping } =
            userDoc;

          const me: IUserAtom = {
            id: userCopy.uid,
            displayName: userCopy.displayName,
            photoURL: userCopy.photoURL,
            email: userCopy.email,
            phoneNumber: userCopy.phoneNumber,
            isAdmin,
            wishlist,
            cart,
            orders,
            address,
            shipping,
          };

          setUser(me);
        } else {
          firebaseAuth.signOut();
        }
      } else {
        setUser(null);
      }

      setFirebaseInit(true);
    });
  }, []);

  useEffect(() => {
    if (!me) return;
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return;

      const userExists = await getFirebaseDoc(userCollection, user.uid);
      if (!userExists) return;

      const userCopy = JSON.parse(JSON.stringify(user)) as User;

      const { isAdmin, wishlist, cart, orders, address, shipping } = me;

      await updateFirebaseDoc(userCollection, userCopy.uid, {
        isAdmin,
        wishlist,
        cart,
        orders,
        address,
        shipping,
      });
    });
  }, [me]);

  return (
    <AnimatePresence mode="wait">
      {firebaseInit && introEnded ? (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <RouterProvider router={router(me)} />
        </motion.div>
      ) : (
        <Loading key="loading" setState={setIntroEnded} text="Toy shop" />
      )}
    </AnimatePresence>
  );
}

export default App;
