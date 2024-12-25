function FormInput({ type, label, name, error, errorMessage }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder="Type here"
        className={`input input-bordered w-full ${error}`}
        name={name}
      />
      {error && (
        <span className="label-text-alt text-error">
          {
            <div className="label">
              <span className="label-text-alt">{errorMessage}</span>
            </div>
          }
        </span>
      )}
    </label>
  );
}

export default FormInput;
