import { useDocument } from "../hooks/useDocument";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  const { error, document } = useDocument("users", id);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  const {
    displayName,
    photoURL,
    coverURL,
    createdAt,
    email,
    emailVerified,
    online,
  } = document;

  return (
    <div className="mt-16">
      <h1 className="mb-10 text-center text-3xl font-semibold capitalize">
        Hello, {displayName}
      </h1>
    </div>
  );
}

export default User;
