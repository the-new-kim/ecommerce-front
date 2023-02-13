import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { IUserAtom, userAtom } from "./libs/atoms";
import { firebaseAuth, firebaseDB } from "./firebase/config";
import Router from "./Router";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);

  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user)) as User; //https://github.com/firebase/firebase-js-sdk/issues/5722 📝 Firebase Recoil Issue...

        const userDocRef = doc(firebaseDB, "users", userCopy.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) return;

        const { isAdmin, wishlist, cart, orders } = userDocSnap.data();

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
        };

        setUser(me);
      } else {
        setUser(null);
      }

      setFirebaseInit(true);
    });
  }, []);

  return <>{firebaseInit ? <Router /> : <div>Init...</div>}</>;
}

export default App;
