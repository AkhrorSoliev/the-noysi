import React from "react";

const Button = ({
  type = "primary", // primary, secondary, info, warning, error
  size = "md", // sm, md, lg
  grow = "grow-0", //
  outline = false,
  loading = false,
  buttonType = "submit",
  children,
  ...props
}) => {
  const baseClass = "btn";
  const typeClass = outline ? `btn-outline btn-${type}` : `btn-${type}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      disabled={loading}
      className={`${baseClass} ${typeClass} ${sizeClass} ${grow}`}
      type={buttonType}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
