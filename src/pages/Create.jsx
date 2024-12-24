import Select from "react-select";
import { Form, useActionData } from "react-router-dom";
import { FormInput, FormTextArea } from "../components";
import makeAnimated from "react-select/animated";
import { useState } from "react";

const animatedComponents = makeAnimated();

const optionsUsers = [
  { value: "ahror", label: "Ahror" },
  { value: "doniyor", label: "Doniyor" },
  { value: "sardor", label: "Sardor" },
];

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const details = form.get("details");
  const setDueData = form.get("dueDate");
  return { name, details, setDueData };
};

function Create() {
  const actionData = useActionData();
  const [assignedUsersList, setAssignedUsersList] = useState(null);
  const [optionsUsers, setOptionsUsers] = useState([
    { value: "ahror", label: "Ahror" },
    { value: "doniyor", label: "Doniyor" },
    { value: "sardor", label: "Sardor" },
  ]);
  const [category, setCategory] = useState([
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
  ]);

  const handleChange = (option) => {
    setAssignedUsersList(option);
  };

  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-medium">Create a new Project</h2>
      <Form method="post" className="flex w-full max-w-[500px] flex-col gap-8">
        <FormInput type="text" label="Project Name:" name="name" />
        <FormTextArea label="Project Details:" name="details" />
        <FormInput type="date" label="Set due data:" name="dueDate" />
        {/* ASSIGN TO */}
        <Select options={category} />

        <Select
          onChange={handleChange}
          options={optionsUsers}
          components={animatedComponents}
          isMulti
        />

        <div className="flex justify-end">
          <button className="btn btn-outline btn-success btn-sm flex-grow-0">
            Add Project
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
