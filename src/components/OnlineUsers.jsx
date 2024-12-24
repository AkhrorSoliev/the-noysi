const onlineUsers = [
  {
    id: 1,
    displayName: "Akhror",
    photoURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Akhror",
    online: false,
  },
  {
    id: 2,
    displayName: "Doniyor",
    photoURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Doniyor",
    online: true,
  },
  {
    id: 3,
    displayName: "Sardor",
    photoURL: "https://api.dicebear.com/9.x/adventurer/svg?seed=Sardor",
    online: false,
  },
];

function OnlineUsers() {
  return (
    <div className="col-span-2 bg-secondary-content px-5 py-10">
      <ul>
        {onlineUsers.map((user) => {
          return (
            <li className="relative flex items-center">
              <span>
                <img src={user.photoURL} alt="" width={80} />
              </span>
              <span className="text-xl font-medium">{user.displayName}</span>
              <span className="absolute inline-block h-3 w-3 rounded-full bg-green-400"></span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
