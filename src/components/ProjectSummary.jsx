import Button from "./Button";
import { useFirestore } from "../hooks/useFirestore";
import toast from "react-hot-toast";
import Modal from "./Modal";
import { useGlobalContext } from "../hooks/useGlobalContext";

function ProjectSummary({ project }) {
  const { user } = useGlobalContext();
  const { updateDocument } = useFirestore("projects");
  const { name, createdBy, dueDate, details, assignedUsersList } = project;

  const makeCopleted = async () => {
    await updateDocument(project.id, {
      completed: !project.completed,
    });
    toast.success(
      project.completed ? "Project completed" : "Project uncompleted",
    );
  };

  return (
    <>
      <Modal project={project} />
      <div className="w-1/2">
        <div className="mb-5 rounded-md bg-base-100 p-5">
          <h5 className="mb-1 text-xl font-semibold">{name}</h5>
          <p className="mb-1 text-sm italic text-neutral-content">
            By {createdBy.displayName}
          </p>
          <p className="mb-10 text-sm text-neutral-content">
            Project due by {dueDate.toDate().toDateString()}
          </p>
          <p className="mb-5 text-base-content">{details}</p>
          <hr className="mb-1" />
          <h4 className="text-md mb-1 font-semibold">
            Project is assigned to:
          </h4>
          <div className="avatar-group -space-x-3 rtl:space-x-reverse">
            {assignedUsersList.map((user) => {
              return (
                <div key={user.id} className="avatar">
                  <div className="w-10">
                    <img
                      src={user.photoURL}
                      alt={`${user.displayName} avatar`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-5">
          {user?.uid === createdBy.id && (
            <>
              <Button
                onClick={makeCopleted}
                size="sm"
                outline
                grow="grow-1"
                type="success"
              >
                {project.completed ? "Mark Uncompleted" : "Mark Complete"}
              </Button>
              <Button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                size="sm"
                outline
                grow="grow-1"
                type="error"
              >
                Delete Project
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectSummary;
