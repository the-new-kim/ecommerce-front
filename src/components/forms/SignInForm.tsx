import { signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { meAtom } from "../../libs/atoms";
import { firebaseAuth } from "../../firebase/config";
import { getUserData } from "../../firebase/utils";

interface ISignInForm {
  email: string;
  password: string;
}

export default function SignInForm() {
  const navigate = useNavigate();
  const setMe = useSetRecoilState(meAtom);

  const { register, handleSubmit } = useForm<ISignInForm>();

  const onSubmit = async ({ email, password }: ISignInForm) => {
    let userData;
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log("ERROR:::", error);
    }
    if (firebaseAuth.currentUser) {
      userData = await getUserData(firebaseAuth.currentUser.uid);

      setMe({
        uid: firebaseAuth.currentUser!.uid,
        displayName: firebaseAuth.currentUser!.displayName || "Anonym",
        email,
        phoneNumber: firebaseAuth.currentUser!.phoneNumber,
        photoURL: firebaseAuth.currentUser!.photoURL,
        isAdmin: false,
        cart: [],
        wishlist: [],
      });
    }
    navigate("/");
  };

  return (
    <>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="email"
            {...register("email", { required: true })}
          />
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        <input
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Sign In"
        />
      </form>
    </>
  );
}
