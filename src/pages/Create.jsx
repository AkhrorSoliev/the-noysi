import Select from "react-select";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { FormInput, FormTextArea } from "../components";
import { useEffect, useState } from "react";
import { useCollection } from "../hooks/useCollection";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Timestamp } from "firebase/firestore";
import { validateProjectData } from "../utils";
import { useFirestore } from "../hooks/useFirestore";

import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";

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
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const { document } = useCollection("users");
  const [users, setUsers] = useState([]);
  const [assignedUsersList, setAssignedUsersList] = useState(null);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState({});
  const { addDocument, response } = useFirestore("projects");
  const createActionData = useActionData();
  console.log(assignedUsersList);
  useEffect(() => {
    setUsers(
      document.map((user) => {
        return {
          label: user.displayName,
          value: { ...user, id: user.id },
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
      assignedUsersList: assignedUsersList?.map((user) => user.value),
      comments: [],
    };

    if (createActionData) {
      const { valid, errors } = validateProjectData(project);
      if (valid) {
        addDocument(project)
          .then(() => {
            toast.success("Project created successfully");
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.code);
          });
      } else {
        setError(errors);
      }
    }
  }, [createActionData]);

  return (
    <div className="mt-16">
      <h2 className="mb-10 text-3xl font-medium">Create a new Project</h2>
      <Form method="post" className="flex w-full max-w-[500px] flex-col gap-8">
        <FormInput
          type="text"
          label="Project Name:"
          name="name"
          error={error.name && "input-error"}
          errorMessage={error.name}
        />
        <FormTextArea
          label="Project Details:"
          name="details"
          error={error.details && "textarea-error"}
          errorMessage={error.details}
        />
        <FormInput
          type="date"
          label="Set due data:"
          name="dueDate"
          error={error.dueDate && "input-error"}
          errorMessage={error.dueDate}
        />
        {/* ASSIGN TO */}
        <Select
          onChange={(option) => setCategory(option)}
          options={categories}
          className={!category && error.category && "react-select-container"}
          classNamePrefix="react-select"
        />

        <Select
          onChange={(option) => setAssignedUsersList(option)}
          options={users}
          components={animatedComponents}
          className={
            !assignedUsersList &&
            error.assignedUsersList &&
            "react-select-container"
          }
          classNamePrefix="react-select"
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
