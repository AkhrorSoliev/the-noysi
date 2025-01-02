import { MdDoneOutline } from "react-icons/md";
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
      <div method="post" className="mt-16">
        <h1 className="mb-10 text-center text-3xl font-semibold capitalize">
          {displayName}
        </h1>

        <div>
          <div
            className="relative h-56 w-full rounded-xl bg-cover bg-center bg-no-repeat shadow-2xl shadow-neutral"
            style={{
              backgroundImage: `url(${coverURL})`,
            }}
          ></div>
          <div className="mt-[-100px] flex flex-col items-center">
            <figure className="group relative cursor-pointer">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
                <img
                  className="h-full w-full object-cover"
                  src={photoURL}
                  alt="User profile picture"
                />
              </div>
            </figure>
          </div>
        </div>
        <div className="mb-10 grid w-full grid-cols-2 items-end gap-5">
          <div className="flex flex-col">
            <div className="label">
              <span className="label-text">Email Status</span>
            </div>
            {!emailVerified ? (
              <div className="flex items-center gap-2">
                <div className="profile-input-card w-full">
                  <p>{email} is not verified.</p>
                </div>
              </div>
            ) : (
              <div className="profile-input-card">
                Email is Verified
                <MdDoneOutline className="text-xl text-green-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
