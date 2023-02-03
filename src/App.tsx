import { onAuthStateChanged, User } from "firebase/auth";

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { ICartProduct, IMe, meAtom } from "./libs/atoms";
import { firebaseAuth } from "./firebase/config";
import Router from "./Router";
import { getUserData } from "./firebase/utils";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);

  const setMe = useSetRecoilState(meAtom);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user)) as User; //https://github.com/firebase/firebase-js-sdk/issues/5722 📝 Firebase Recoil Issue...

        const userData = await getUserData(userCopy.uid);

        const me: IMe = {
          docId: userData.docId,
          uid: userCopy.uid,
          displayName: userCopy.displayName,
          photoURL: userCopy.photoURL,
          email: userCopy.email,
          phoneNumber: userCopy.phoneNumber,
          isAdmin: userData.isAdmin,
          wishlist: userData.wishlist,
          cart: userData.cart.map((item) => JSON.parse(item)),
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
