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
import Form from "../elements/form/Form";
import Label from "../elements/form/Label";
import Input from "../elements/form/Input";
import ErrorMessage from "../elements/form/ErrorMessage";

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
          setError("email", { message: "Email already in use" });
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Email
          <Input
            hasError={!!errors.email}
            type="email"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Label>

        <Label>
          Password
          <Input
            hasError={!!errors.password}
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be 8 or more characters in length",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          Confirm Password
          <Input
            hasError={!!errors.passwordRepeat}
            type="password"
            placeholder="Confirm Password"
            {...register("passwordRepeat", {
              required: "This field is required",
              validate: (value) =>
                value === watch("password") ||
                "Password confirmation does not match",
            })}
          />
          {errors.passwordRepeat && (
            <ErrorMessage>{errors.passwordRepeat.message}</ErrorMessage>
          )}
        </Label>
        <Input disabled={creating} type="submit" value="Create" />
      </Form>
    </>
  );
}
