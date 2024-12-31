import { useCollection } from "../hooks/useCollection";

function OnlineUsers() {
  const { document } = useCollection("users");

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="col-span-2 bg-base-200 px-5 py-10">
      <ul className="flex flex-col gap-4">
        {document &&
          document.map((user) => {
            return (
              <li key={user.id} className="flex items-center space-x-4">
                <span
                  className={`h-3 w-3 shrink-0 rounded-full ${
                    user.online ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></span>
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span>{user.displayName}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
