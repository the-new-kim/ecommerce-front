import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { IUserAtom, userAtom } from "./libs/atoms";
import { firebaseAuth, userCollection } from "./firebase/config";
// import Router from "./router";

import { getFirebaseDoc, updateFirebaseDoc } from "./firebase/utils";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);
  const [me, setUser] = useRecoilState(userAtom);

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
      console.log("💥💥💥💥State changed💥💥💥💥");

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
    <>
      {firebaseInit ? (
        <RouterProvider router={router(me)} />
      ) : (
        <div>Init...</div>
      )}
    </>
  );
}

export default App;
