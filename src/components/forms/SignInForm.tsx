import { signInWithEmailAndPassword } from "firebase/auth";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase/config";
import FieldErrorMessage from "../elements/form/FieldErrorMessage";
import Form from "../elements/form/Form";
import Input from "../elements/form/Input";
import Label from "../elements/form/Label";

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

  const onValid = async ({ email, password }: ISignInForm) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("password")) {
          setError("password", { message: "Wrong password" });
        }
        if (error.message.includes("user")) {
          setError("email", { message: "User not found" });
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
      <Form
        // className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"

        onSubmit={handleSubmit(onValid)}
      >
        <Label>
          Email
          <Input
            type="email"
            {...register("email", { required: "This field is required" })}
            hasError={!!errors.email}
          />
          {errors.email && (
            <FieldErrorMessage>{errors.email.message}</FieldErrorMessage>
          )}
        </Label>
        <Label>
          Password
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: "This field is required" })}
            hasError={!!errors.password}
          />
          {errors.password && (
            <FieldErrorMessage>{errors.password.message}</FieldErrorMessage>
          )}
        </Label>
        <Input type="submit" value="Sign In" />
      </Form>
    </>
  );
}
