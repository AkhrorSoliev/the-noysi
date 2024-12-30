import { useGlobalContext } from "../hooks/useGlobalContext";
import Comment from "./Comment";
import AddComment from "./AddComment";

function ProjectComment({ project }) {
  const { completed, comments, commentAccess } = project;

  const { user } = useGlobalContext();

  if (!commentAccess) {
    return (
      <div className="grid h-[500px] w-1/2 place-items-center py-5">
        <h4 className="mb-4 text-center text-xl font-semibold opacity-50">
          Project Creator gives access to comment on this project only assigned
          users.
          <br />
          <br />
          You can only read project.
        </h4>
      </div>
    );
  }

  return (
    <div className="w-1/2 py-5">
      <h4 className="mb-4 text-xl font-medium">Project Comments:</h4>
      <div className={`${!completed && "opacity-50"}`}>
        <Comment comments={comments} user={user} />
      </div>
      {!completed ? (
        <AddComment project={project} user={user} />
      ) : (
        <div>
          <p className="text-center text-xl text-gray-500">
            If you want to add a comment, please uncomplete the project first.
            Thank you!
          </p>
        </div>
      )}
    </div>
  );
}

export default ProjectComment;
