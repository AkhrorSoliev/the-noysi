import { useEffect, useRef } from "react";
import { formatCommentTime } from "../utils";

function Comment({ comments, user }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className="mb-10 max-h-[500px] overflow-y-auto pr-2">
      {comments.map((comment) => {
        const { content, createdAt, displayName, photoURL, uid, id } = comment;
        const { day, hour } = formatCommentTime(createdAt);
        return (
          <div
            className={`chat ${user.uid == uid ? "chat-end" : "chat-start"}`}
            key={id}
          >
            <div className="avatar chat-image">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src={photoURL} />
              </div>
            </div>
            <div className="chat-header flex items-center gap-1">
              <p className={`${user.uid == uid && "order-1"}`}>{displayName}</p>
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
  );
}

export default Comment;
