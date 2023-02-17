import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../../libs/atoms";
import { firebaseAuth } from "../../firebase/config";
import ShippingInformationForm from "../../components/forms/ShippingInformationForm";

import Heading from "../../components/typos/Heading";

export default function MeEdit() {
  const [me] = useRecoilState(userAtom);
  const navigage = useNavigate();

  const onLogoutClick = () => {
    signOut(firebaseAuth);
    navigage("/");
  };

  return (
    <>
      <Heading tagName="h3">{me?.displayName}'s Profile</Heading>
      <hr className="my-5" />
      <Heading>Shipping Information</Heading>
      <ShippingInformationForm />

      <button
        className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onLogoutClick}
      >
        Logout
      </button>
    </>
  );
}
