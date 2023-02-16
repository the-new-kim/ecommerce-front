import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { firebaseAuth, userCollection } from "../../firebase/config";
import { useEffect, useState } from "react";
import Message from "../Message";

interface IRegisterForm {
  email: string;
  // name: string;
  password: string;
  passwordRepeat: string;
}

export default function RegisterForm() {
  const [creating, setCreating] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<IRegisterForm>();

  const onSubmit = async ({ email, password }: IRegisterForm) => {
    setCreating(true);

    try {
      // 1️⃣ Create firebase user
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      console.log("userCredential:::", userCredential.user);

      // await updateProfile(userCredential.user, {
      //   displayName: name,
      // });

      // 2️⃣ Create new user doc

      await setDoc(doc(userCollection, userCredential.user.uid), {
        isAdmin: false,
        wishlist: [],
        cart: {
          paymentIntent: null,
          products: [],
        },
        orders: [],
        address: null,
        shipping: null,
      });

      // 3️⃣ Login
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("email")) {
          setError("email", { message: "Email already in use." });
        }
      }
      console.log("ERROR:::", error);
    }

    setCreating(false);
  };

  useEffect(() => {
    console.log("FB CURRENT", firebaseAuth.currentUser);
  }, [firebaseAuth]);

  return (
    <>
      {creating && <Message>Creating account...</Message>}
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

        {/* <label className="block text-gray-700 text-sm font-bold mb-2">
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
        </label> */}

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
          disabled={creating}
          type="submit"
          value="Create"
        />
      </form>
    </>
  );
}
