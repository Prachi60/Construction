import React from "react";

export default function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  block = false, 
  className = "", 
  disabled = false, 
  onClick, 
  type = "button" 
}) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== "md" ? `btn-${size}` : "";
  const blockClass = block ? "btn-block" : "";
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${blockClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
