import { signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase/config";

interface ISignInForm {
  email: string;
  password: string;
}

export default function SignInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignInForm>();

  const onSubmit = async ({ email, password }: ISignInForm) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("password")) {
          setError("password", { message: "Wrong password." });
        }
        if (error.message.includes("user")) {
          setError("email", { message: "User not found." });
        }
      }
      console.log("ERROR:::", error);
    }
    if (firebaseAuth.currentUser) {
      navigate("/");
    }
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
          Password
          <input
            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <small className="text-red-300 font-medium">
              * {errors.password.message}
            </small>
          )}
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
