import { useEffect, useState } from "react";

function FormInput({ type, label, name, error, errorMessage, val, ...props }) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (val) setText(val);
  }, [val]);

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder="Type here"
        className={`input input-bordered w-full ${text.length < 3 && error} `}
        onChange={(e) => setText(e.target.value)}
        value={text}
        {...props}
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
