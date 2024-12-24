function FormInput({ type, label, name }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder="Type here"
        className="input input-bordered w-full"
        name={name}
      />
    </label>
  );
}

export default FormInput;
