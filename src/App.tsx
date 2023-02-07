import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { IMe, meAtom } from "./libs/atoms";
import { firebaseAuth, firebaseDB } from "./firebase/config";
import Router from "./Router";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);

  const setMe = useSetRecoilState(meAtom);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user)) as User; //https://github.com/firebase/firebase-js-sdk/issues/5722 📝 Firebase Recoil Issue...

        const docRef = doc(firebaseDB, "users", userCopy.uid);
        const docSnap = await getDoc(docRef);

        const me: IMe = {
          uid: userCopy.uid,
          displayName: userCopy.displayName,
          photoURL: userCopy.photoURL,
          email: userCopy.email,
          phoneNumber: userCopy.phoneNumber,
          isAdmin: docSnap.data()?.isAdmin || false,
          wishlist: docSnap.data()?.wishlist || [],
          cart:
            docSnap.data()?.cart.map((item: string) => JSON.parse(item)) || [],
        };

        setMe(me);
      } else {
        setMe(null);
      }

      setFirebaseInit(true);
    });
  }, []);

  return <>{firebaseInit ? <Router /> : <div>Init...</div>}</>;
}

export default App;
