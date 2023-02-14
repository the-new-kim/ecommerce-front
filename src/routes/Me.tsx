import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../libs/atoms";
import { firebaseAuth } from "../firebase/config";
import H1 from "../components/typos/H1";

import H3 from "../components/typos/H3";

export default function Me() {
  const [me] = useRecoilState(userAtom);
  const navigage = useNavigate();

  const onLogoutClick = () => {
    signOut(firebaseAuth);
    navigage("/");
  };

  return (
    <div className="p-5">
      <H3>{me?.displayName}'s Profile</H3>

      <button
        className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onLogoutClick}
      >
        Logout
      </button>
      {/* {!!me?.orders.length && (
        <>
          <H1>Order</H1>
          {me.orders.map((order, index) => (
            <div key={`order${index}`}>{order}</div>
          ))}
        </>
      )} */}
    </div>
  );
}
