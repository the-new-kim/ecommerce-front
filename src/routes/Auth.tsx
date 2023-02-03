import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { meAtom } from "../libs/atoms";
import RegisterForm from "../components/forms/RegisterForm";
import SiginInForm from "../components/forms/SignInForm";

import { firebaseAuth } from "../firebase/config";

export default function Auth() {
  const navigate = useNavigate();
  const me = useRecoilValue(meAtom);
  const [newAccount, setNewAccount] = useState(false);

  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (!provider) return;

    await signInWithPopup(firebaseAuth, provider);
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="flex flex-col justify-center items-center p-5">
      {newAccount ? <RegisterForm /> : <SiginInForm />}

      <button className="underline" onClick={toggleAccount}>
        {newAccount ? "sign in" : "create account"}
      </button>

      <span className="flex flex-col [&>*]:mb-3">
        <button
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onSocialClick}
          name="google"
        >
          Google Login
        </button>
        <button
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onSocialClick}
          name="github"
        >
          Github Login
        </button>
      </span>
    </div>
  );
}
