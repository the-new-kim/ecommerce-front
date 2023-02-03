import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { meAtom } from "../../libs/atoms";
import { firebaseAuth, firebaseDB } from "../../firebase/config";

interface IRegisterForm {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const setMe = useSetRecoilState(meAtom);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const onSubmit = async ({ email, name, password }: IRegisterForm) => {
    let docId = "";
    try {
      const response = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      console.log("RESPONSE USER:::", response.user);
      console.log("AUTH CURRENT USER:::", firebaseAuth.currentUser);

      await updateProfile(response.user, {
        displayName: name,
      });

      const addedDoc = await addDoc(collection(firebaseDB, "users"), {
        uid: response.user.uid,
        email: response.user.email,
        displayName: response.user.displayName,
        phoneNumber: response.user.phoneNumber,
        photoURL: response.user.photoURL,
        isAdmin: false,
        createdAt: Date.now(),
        wishlist: [],
        cart: [],
      });

      docId = addedDoc.id;

      console.log("ADDED USER ID:::", addedDoc.id);
    } catch (error) {
      console.log("ERROR:::", error);
    }
    if (firebaseAuth.currentUser)
      setMe({
        docId,
        uid: firebaseAuth.currentUser!.uid,
        displayName: firebaseAuth.currentUser!.displayName || "Anonym",
        email,
        phoneNumber: firebaseAuth.currentUser!.phoneNumber,
        photoURL: firebaseAuth.currentUser!.photoURL,
        isAdmin: false,
        wishlist: [],
        cart: [],
      });
    console.log("AUTH CURRENT USER:::", firebaseAuth.currentUser);

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
          {errors.email && (
            <small className="text-red-300 font-medium">
              * {errors.email.message}
            </small>
          )}
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="text-red-300 font-medium">
              * {errors.name.message}
            </small>
          )}
        </label>

        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be 8 or more characters in length.",
              },
            })}
          />
          {errors.password && (
            <small className="text-red-300 font-medium">
              * {errors.password.message}
            </small>
          )}
        </label>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Confirm Password
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="password"
            placeholder="Confirm Password"
            {...register("passwordRepeat", {
              required: true,
              validate: (value) =>
                value === watch("password") ||
                "Password confirmation does not match.",
            })}
          />
          {errors.passwordRepeat && (
            <small className="text-red-300 font-medium">
              * {errors.passwordRepeat.message}
            </small>
          )}
        </label>
        <input
          className="mt-5 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          value="Create"
        />
      </form>
    </>
  );
}
