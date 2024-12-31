import { useGlobalContext } from "../hooks/useGlobalContext";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";

function ProjectComment({ project }) {
  const [allowComment, setAllowComment] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const {
    completed,
    comments,
    commentAccess,
    createdBy,
    readComments,
    assignedUsersList,
  } = project;
  const { user } = useGlobalContext();

  useEffect(() => {
    if (
      commentAccess ||
      user.uid == createdBy.id ||
      assignedUsersList.find((u) => u.id == user.uid)
    ) {
      setAllowComment(true);
    }

    if (
      readComments ||
      assignedUsersList.find((u) => u.id == user.uid) ||
      user.uid == createdBy.id
    ) {
      setShowComment(true);
    }
  }, [commentAccess, user, createdBy, assignedUsersList]);

  return (
    <div className="w-1/2 py-5">
      {showComment && allowComment && (
        <h4 className="mb-4 text-xl font-medium">Project Comments:</h4>
      )}
      {showComment && <Comment comments={comments} user={user} />}

      {allowComment && <AddComment project={project} user={user} />}

      {showComment && !allowComment && (
        <p className="text-center text-xl text-gray-500">
          You can only read comments on this project.
        </p>
      )}

      {!showComment && !allowComment && (
        <p className="text-center text-xl text-gray-500">
          You can only read this project.
        </p>
      )}

      {completed && (
        <p className="text-center text-xl text-gray-500">
          To add comments, please mark the project as incomplete first. Thank
          you!
        </p>
      )}
    </div>
  );
}

export default ProjectComment;
