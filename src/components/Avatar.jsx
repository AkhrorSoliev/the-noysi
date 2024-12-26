function Avatar({ user }) {
  return (
    <div className="mb-10 flex flex-col items-center border-b py-10">
      <img
        className="mb-5 rounded-full"
        src={user.photoURL}
        alt="user avatar"
        width={65}
      />
      <h3 className="text-xl font-semibold text-white">
        Hello, {user.displayName}
      </h3>
    </div>
  );
}

export default Avatar;
