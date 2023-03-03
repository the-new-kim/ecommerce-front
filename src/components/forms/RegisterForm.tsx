import { useState } from "react";

import { useForm } from "react-hook-form";
import { firebaseAuth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

import Form from "../elements/form/Form";
import Label from "../elements/form/Label";
import Input from "../elements/form/Input";
import FieldErrorMessage from "../elements/form/FieldErrorMessage";

import PageLoader from "../loaders/PageLoader";

interface IRegisterForm {
  email: string;
  username: string;
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

  const onSubmit = async ({ email, password, username }: IRegisterForm) => {
    setCreating(true);

    try {
      // 1️⃣ Create firebase user
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      const auth = getAuth();

      await updateProfile(userCredential.user, {
        displayName: username,
      });

      console.log("CURRENT USER:::", auth.currentUser);

      // 2️⃣ Create new user doc

      // console.log("USER CREDENTIAL", userCredential.user);

      // await createUserDoc(userCredential);

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

  return (
    <>
      <PageLoader showing={creating}>Creating account...</PageLoader>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Email
          <Input
            hasError={!!errors.email}
            type="email"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <FieldErrorMessage>{errors.email.message}</FieldErrorMessage>
          )}
        </Label>

        <Label>
          Username
          <Input
            hasError={!!errors.username}
            type="text"
            {...register("username", { required: "This field is required" })}
          />
          {errors.username && (
            <FieldErrorMessage>{errors.username.message}</FieldErrorMessage>
          )}
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
            <FieldErrorMessage>{errors.password.message}</FieldErrorMessage>
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
            <FieldErrorMessage>
              {errors.passwordRepeat.message}
            </FieldErrorMessage>
          )}
        </Label>
        <Input disabled={creating} type="submit" value="Create" />
      </Form>
    </>
  );
}
