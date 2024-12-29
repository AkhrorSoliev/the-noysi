import { Timestamp } from "firebase/firestore";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFirestore } from "../hooks/useFirestore";
import { formatCommentTime } from "../utils";

function ProjectComment({ project }) {
  const { user } = useGlobalContext();
  const [comment, setComment] = useState("");
  const { updateDocument } = useFirestore("projects");
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [project.comments]);

  return (
    <div className="w-1/2 py-5">
      <h4 className="mb-4 text-xl font-medium">Project Comments:</h4>

      <div className="mb-10 max-h-[500px] overflow-y-auto">
        {project.comments.map((comment) => {
          const { content, createdAt, displayName, photoURL, uid, id } =
            comment;
          const { day, hour } = formatCommentTime(createdAt);
          return (
            <div
              className={`chat ${user.uid == uid ? "chat-end" : "chat-start"}`}
              key={id}
            >
              <div className="avatar chat-image">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={photoURL}
                  />
                </div>
              </div>
              <div className="chat-header flex items-center gap-1">
                <p className={`${user.uid == uid && "order-1"}`}>
                  {displayName}
                </p>
                <time className="text-xs opacity-50">
                  {day !== "Today" ? `${day} at ${hour}` : `${hour}`}
                </time>
              </div>
              <div className="chat-bubble">{content}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      <div>
        <p className="mb-2 text-sm">Add new comment:</p>
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="textarea textarea-bordered mb-4 w-full"
            placeholder="Type your comment here..."
          ></textarea>
          <Button size="sm" outline>
            Add Comment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ProjectComment;
