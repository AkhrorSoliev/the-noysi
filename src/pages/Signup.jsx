import { Form, useActionData } from "react-router-dom";
import { FormInput, Navbar } from "../components";
import { useEffect, useState } from "react";
import { validateSignupOrLoginData } from "../utils";
import { Button } from "../components";

import { useSignup } from "../hooks/useSignup";
import { useGoogle } from "../hooks/useGoogle";

// action
export async function action({ request }) {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  return { displayName, email, password, confirmPassword };
}

function Signup() {
  const { isPending, withGoogle } = useGoogle();
  const { isLoading, signup } = useSignup();
  const signupActionData = useActionData();
  const [error, setError] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (signupActionData) {
      const { valid, errors } = validateSignupOrLoginData(
        signupActionData,
        true,
      );
      if (valid) {
        const { email, password, displayName } = signupActionData;
        signup(email, password, displayName);
      } else {
        setError((prev) => ({
          ...prev,
          ...errors,
        }));
      }
    }

    return () => {
      setError({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    };
  }, [signupActionData]);

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-14 w-full max-w-96">
        <Form method="post" className="flex flex-col gap-3">
          <h3 className="text-3xl font-bold">Signup</h3>
          <FormInput
            type="text"
            label="Display Name"
            name="displayName"
            error={error.displayName && "input-error"}
            errorMessage={error.displayName}
          />
          <FormInput
            type="email"
            label="Email"
            name="email"
            error={error.email && "input-error"}
            errorMessage={error.email}
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            error={error.password && "input-error"}
            errorMessage={error.password}
          />
          <FormInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            error={error.confirmPassword && "input-error"}
            errorMessage={error.confirmPassword}
          />
          <div className="flex w-full">
            <Button type="primary" size="md" loading={isLoading} grow="grow">
              Signup
            </Button>
            <div className="divider divider-horizontal">OR</div>
            <Button
              type="secondary"
              onClick={withGoogle}
              loading={isPending}
              buttonType="button"
              className="btn btn-primary grow"
            >
              Google
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Signup;
