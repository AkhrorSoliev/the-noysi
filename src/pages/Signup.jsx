import { Form, useActionData } from "react-router-dom";
import { FormInput, Navbar } from "../components";
import { useEffect } from "react";
import { validateSignupOrLoginData } from "../utils";

// action
export async function action({ request }) {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const email = formData.get("email");
  const password = formData.get("password");
  return { displayName, email, password };
}

function Signup() {
  const signupActionData = useActionData();
  console.log(signupActionData);
  useEffect(() => {
    if (signupActionData) {
      console.log(validateSignupOrLoginData(signupActionData, true));
    }
  }, [signupActionData]);
  return (
    <>
      <Navbar />
      <div className="mx-auto mt-14 w-full max-w-96">
        <Form method="post" className="flex flex-col gap-3">
          <h3 className="text-3xl font-bold">Signup</h3>
          <FormInput type="text" label="Display Name" name="displayName" />
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />
          <FormInput type="password" label="Confirm Password" />
          <div className="flex w-full">
            <button className="btn btn-primary grow">Signup</button>
            <div className="divider divider-horizontal">OR</div>
            <button type="button" className="btn btn-primary grow">
              Google
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Signup;
