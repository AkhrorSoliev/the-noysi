import Button from "./Button";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useFirestore } from "../hooks/useFirestore";
import { useState } from "react";

function AddComment({ project, user, id }) {
  const { updateDocument } = useFirestore("projects");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError(true);
      return;
    }

    const commentToAdd = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: comment,
      createdAt: Timestamp.fromDate(new Date()),
      id: uuidv4(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    setComment("");
    setError(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm">Add new comment:</p>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
              setError(false);
            }}
            onKeyDown={handleKeyDown}
            value={comment}
            className={`textarea textarea-bordered w-full ${error && "textarea-error"}`}
            placeholder="Type your comment here..."
          ></textarea>
          {error && (
            <p className="text-xs text-error">Comment cannot be empty</p>
          )}
        </div>
        <Button size="sm" outline>
          Add Comment
        </Button>
      </form>
    </div>
  );
}

export default AddComment;
