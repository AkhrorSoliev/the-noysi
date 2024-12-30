function FormCheckbox({ label, ...props }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="text-md label-text font-semibold">{label}</span>
        <input type="checkbox" className="checkbox" {...props} />
      </label>
    </div>
  );
}

export default FormCheckbox;
