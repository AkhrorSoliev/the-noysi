import { useEffect, useState } from "react";

function FormInput({ type, label, name, error, errorMessage }) {
  const [text, setText] = useState("");

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder="Type here"
        className={`input input-bordered w-full ${text.length < 3 && error}`}
        name={name}
        onChange={(e) => setText(e.target.value)}
      />
      {text.length < 3 && error && (
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
