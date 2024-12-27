import Select from "react-select";
import { Form, useActionData } from "react-router-dom";
import { FormInput, FormTextArea } from "../components";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Timestamp } from "firebase/firestore";

const animatedComponents = makeAnimated();

const categories = [
  { value: "frontend", label: "Frotnend" },
  { value: "backend", label: "Backend" },
  { value: "copywriting", label: "Copywriting" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "management", label: "Management" },
  { value: "other", label: "Other" },
];

export const action = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name");
  const details = form.get("details");
  const dueDate = form.get("dueDate");
  return { name, details, dueDate };
};

function Create() {
  const { user } = useGlobalContext();
  const { document } = useCollection("users");
  const [users, setUsers] = useState([]);
  const [assignedUsersList, setAssignedUsersList] = useState(null);
  const [category, setCategory] = useState(null);
  const createActionData = useActionData();

  useEffect(() => {
    setUsers(
      document.map((user) => {
        return {
          label: user.displayName,
          value: { ...user },
        };
      }),
    );
  }, [document]);

  useEffect(() => {
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const project = {
      ...createActionData,
      dueDate: Timestamp.fromDate(new Date(createActionData?.dueDate)),
      createdBy,
      category,
      assignedUsersList,
      comments: [],
    };

    if (createActionData) {
      console.log(project);
    }
  }, [createActionData]);

  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-medium">Create a new Project</h2>
      <Form method="post" className="flex w-full max-w-[500px] flex-col gap-8">
        <FormInput type="text" label="Project Name:" name="name" />
        <FormTextArea label="Project Details:" name="details" />
        <FormInput type="date" label="Set due data:" name="dueDate" />
        {/* ASSIGN TO */}
        <Select
          onChange={(option) => setCategory(option)}
          options={categories}
        />

        <Select
          onChange={(option) => setAssignedUsersList(option)}
          options={users}
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
