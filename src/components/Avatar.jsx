function Avatar() {
  return (
    <div className="mb-10 flex flex-col items-center border-b py-10">
      <span className="mb-2 rounded-full bg-slate-50 p-1">
        <img
          src="https://api.dicebear.com/9.x/adventurer/svg?seed=Aiden"
          alt="user avatar"
          width={65}
        />
      </span>
      <h3 className="font-semibold text-white">Hello, Akhror</h3>
    </div>
  );
}

export default Avatar;
