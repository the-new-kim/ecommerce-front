import { async } from "@firebase/util";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { IMe, meAtom } from "./atoms";
import { firebaseAuth, firebaseDB } from "./firebase";
import Router from "./Router";

function App() {
  const [firebaseInit, setFirebaseInit] = useState(false);

  const setMe = useSetRecoilState(meAtom);

  const getUserData = async (userId: string) => {
    const q = query(
      collection(firebaseDB, "users"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const userCopy = JSON.parse(JSON.stringify(user)) as User; //https://github.com/firebase/firebase-js-sdk/issues/5722 📝 Firebase Recoil Issue...

        const userData = await getUserData(userCopy.uid);

        const me: IMe = {
          uid: userCopy.uid,
          displayName: userCopy.displayName,
          photoURL: userCopy.photoURL,
          email: userCopy.email,
          phoneNumber: userCopy.phoneNumber,
          isAdmin: userData.isAdmin,
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
