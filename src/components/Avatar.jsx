function Avatar({ user }) {
  return (
    <div className="mb-10 flex flex-col items-center border-b py-10">
      <img
        className="mb-5 h-[65px] w-[65px] rounded-full object-cover"
        src={user.photoURL}
        alt="user avatar"
      />
      <h3 className="text-xl font-semibold text-white">
        Hello, {user.displayName}
      </h3>
    </div>
  );
}

export default Avatar;
