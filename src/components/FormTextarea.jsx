function FormTextarea({ name }) {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">Project Details:</span>
      </div>
      <textarea
        className="textarea textarea-bordered h-24"
        placeholder="Text here"
        name={name}
      ></textarea>
    </label>
  );
}

export default FormTextarea;
