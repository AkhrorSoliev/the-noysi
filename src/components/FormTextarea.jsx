import { useState } from "react";

function FormTextarea({ name, error, errorMessage }) {
  const [text, setText] = useState("");
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">Project Details:</span>
      </div>
      <textarea
        className={`textarea textarea-bordered h-24 ${text.length < 10 && error}`}
        placeholder="Text here"
        onChange={(e) => setText(e.target.value)}
        name={name}
      ></textarea>
      {text.length < 10 && (
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

export default FormTextarea;
