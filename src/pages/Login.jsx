import { Navbar } from "../components";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useEffect, useState } from "react";
import { validateSignupOrLoginData } from "../utils";
import { Button } from "../components";
import { useLogin } from "../hooks/useLogin";
import { useGoogle } from "../hooks/useGoogle";

// action
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return { email, password };
}

function Login() {
  const { isPending, withGoogle } = useGoogle();
  const { login, isLoading } = useLogin();
  const loginActionData = useActionData();
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (loginActionData) {
      const { valid, errors } = validateSignupOrLoginData(loginActionData);
      if (valid) {
        const { email, password } = loginActionData;
        login(email, password);
      } else {
        setError((prev) => ({
          ...prev,
          ...errors,
        }));
      }
    }
    return () => {
      setError({
        email: "",
        password: "",
      });
    };
  }, [loginActionData]);

  return (
    <>
      <Navbar />
      <div className="mx-auto mt-14 w-full max-w-96">
        <Form method="post" className="flex flex-col gap-3">
          <h3 className="text-3xl font-bold">Login</h3>
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
          <div className="flex w-full">
            <Button loading={isLoading} size="md" grow="grow">
              Login
            </Button>
            <div className="divider divider-horizontal">OR</div>
            <Button
              onClick={withGoogle}
              loading={isPending}
              type="button"
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

export default Login;
