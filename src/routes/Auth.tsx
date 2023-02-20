import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../libs/atoms";
import RegisterForm from "../components/forms/RegisterForm";
import SiginInForm from "../components/forms/SignInForm";

import { firebaseAuth } from "../firebase/config";
import Button from "../components/elements/Button";
import { GithubLogo, GoogleLogo } from "phosphor-react";

export default function Auth() {
  const navigate = useNavigate();
  const me = useRecoilValue(userAtom);
  const [newAccount, setNewAccount] = useState(false);

  useEffect(() => {
    if (!me) return;
    navigate("/");
  }, [me]);

  const onSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    if (!provider) return;
    try {
      const popup = await signInWithPopup(firebaseAuth, provider);
      console.log("POPUP USER:::", popup.user);
    } catch (error) {
      console.log("ERROR::::", error);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center max-w-lg w-full">
        <div className="mb-5 border-[1px] border-black p-5 w-full">
          <div className="mb-5">
            {newAccount ? <RegisterForm /> : <SiginInForm />}
          </div>
          <button className="underline mb-3" onClick={toggleAccount}>
            {newAccount ? "sign in" : "create account"}
          </button>
        </div>

        <div className="flex flex-col [&>*]:mb-3 [&>*]:flex [&>*]:justify-center [&>*]:items-center w-full">
          <Button onClick={onSocialClick} name="google">
            <GoogleLogo className="mr-3" />
            {!newAccount ? "sign in" : "sign up"} with google account
          </Button>
          <Button onClick={onSocialClick} name="github">
            <GithubLogo className="mr-3" />
            {!newAccount ? "sign in" : "sign up"} with github account
          </Button>
        </div>
      </div>
    </div>
  );
}
