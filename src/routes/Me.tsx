import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { meAtom } from "../atoms";
import { firebaseAuth } from "../firebase";

export default function Me() {
  const [me] = useRecoilState(meAtom);
  const navigage = useNavigate();

  const onLogoutClick = () => {
    signOut(firebaseAuth);
    navigage("/");
  };

  return (
    <div>
      <div>{me?.displayName}'s Profile</div>
      <button
        className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onLogoutClick}
      >
        Logout
      </button>
    </div>
  );
}
