import React from "react";

const Button = ({
  type = "primary",
  size = "md",
  grow = "grow-0", //
  outline = false,
  loading = false,
  buttonType = "submit",
  disabled = false,
  children,
  ...props
}) => {
  const typeClass = outline ? `btn-outline btn-${type}` : `btn-${type}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      disabled={loading || disabled}
      className={`btn ${type} ${typeClass} ${sizeClass} ${grow}`}
      type={buttonType}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
