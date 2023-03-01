import { signOut } from "firebase/auth";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Heading from "../../components/elements/typos/Heading";
import SEO from "../../components/SEO";
import { firebaseAuth } from "../../firebase/config";

export default function MeLayout() {
  const navigage = useNavigate();

  const onLogoutClick = () => {
    signOut(firebaseAuth);

    navigage("/");
  };

  return (
    <>
      <SEO pageTitle="Account" />
      <div className="flex flex-col md:grid md:grid-cols-12 h-full [&>*]:p-5">
        <div className="md:col-span-2 flex flex-col">
          <Heading tagName="h3" className="mb-2 md:mb-5">
            Account
          </Heading>
          <nav
            className="flex justify-between items-center border-b-[1px] border-black [&>*]:mr-3 
        md:flex-col md:[&>*]:mb-1 md:border-none md:justify-start md:items-start
        "
          >
            <Link to="/me">Order history</Link>
            <Link to="/me/addresses">Address book</Link>
            <div className="cursor-pointer" onClick={onLogoutClick}>
              Logout
            </div>
          </nav>
        </div>
        <div className="col-span-10 col-start-3 flex flex-col justify-start items-start">
          <Outlet />
        </div>
      </div>
    </>
  );
}
