import { Navbar } from "../components";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";

// action
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return { email, password };
}
function Login() {
  const loginActionData = useActionData();
  console.log(loginActionData);
  return (
    <>
      <Navbar />
      <div className="mx-auto mt-14 w-full max-w-96">
        <Form method="post" className="flex flex-col gap-3">
          <h3 className="text-3xl font-bold">Login</h3>
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />
          <div className="flex w-full">
            <button className="btn btn-primary grow">Login</button>
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

export default Login;
