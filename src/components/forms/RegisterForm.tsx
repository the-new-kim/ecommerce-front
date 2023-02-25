import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useForm } from "react-hook-form";
import { firebaseAuth, userCollection } from "../../firebase/config";
import { useState } from "react";
import Message from "../Message";
import Form from "../elements/form/Form";
import Label from "../elements/form/Label";
import Input from "../elements/form/Input";
import FieldErrorMessage from "../elements/form/FieldErrorMessage";
import { createUserDoc, setFirebaseDoc } from "../../firebase/utils";
import { IUser } from "../../firebase/types";

interface IRegisterForm {
  email: string;
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
      {creating && <Message>Creating account...</Message>}
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
