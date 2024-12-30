import React from "react";

const Button = ({
  type = "primary", // primary, secondary, info, warning, error
  size = "md", // sm, md, lg
  grow = "grow-0", //
  outline = false,
  loading = false,
  buttonType = "suubmit",
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
      {...props}
      type={buttonType}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;

// Usage Example:
// <Button type="primary" size="sm">Primary Small</Button>
// <Button type="secondary" size="md" outline>Secondary Outline</Button>
// <Button type="warning" size="lg" loading>Warning Large</Button>
