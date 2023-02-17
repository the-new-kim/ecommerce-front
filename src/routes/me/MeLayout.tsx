import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Button from "../../components/Button";
import Heading from "../../components/typos/Heading";
import { firebaseAuth } from "../../firebase/config";
import { userAtom } from "../../libs/atoms";

export default function MeLayout() {
  const me = useRecoilValue(userAtom);

  const navigage = useNavigate();

  const onLogoutClick = () => {
    signOut(firebaseAuth);
    navigage("/");
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-start">
        <Heading tagName="h3" className="mb-5">
          {me?.displayName}'s Profile
        </Heading>
        <Button link={onLogoutClick}>Logout</Button>
      </div>
      <Outlet />
    </div>
  );
}
