import toast from "react-hot-toast";
import { useFirestore } from "../hooks/useFirestore";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Modal({ project }) {
  const navigate = useNavigate();
  const { deledeleteDocument, response } = useFirestore("projects");

  const deleteProject = () => {
    deledeleteDocument(project.id);
    navigate("/");
    toast.success("Project deleted");
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="text-lg">
          Do you want to delete{" "}
          <span className="font-bold">{project.name}</span> project by{" "}
          <span className="font-medium">{project.createdBy.displayName}</span>?
        </h3>
        <div className="modal-action">
          <form method="dialog">
            <div className="flex items-center gap-2">
              <Button
                onClick={deleteProject}
                buttonType="button"
                className="btn btn-outline btn-error btn-sm"
                loading={response.isPending}
                size="sm"
              >
                Delete
              </Button>
              <button className="btn btn-outline btn-success btn-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
