import { useGlobalContext } from "../hooks/useGlobalContext";
import Comment from "./Comment";
import AddComment from "./AddComment";

function ProjectComment({ project }) {
  const { user } = useGlobalContext();

  return (
    <div className="w-1/2 py-5">
      <h4 className="mb-4 text-xl font-medium">Project Comments:</h4>
      <Comment comments={project.comments} user={user} />
      <AddComment project={project} user={user} id={project.id} />
    </div>
  );
}

export default ProjectComment;
