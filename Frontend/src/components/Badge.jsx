import React from "react";

export default function Badge({ children, variant = "info", style = {}, onClick }) {
  // variants can be: success (green), info (blue), warning (amber), danger (red), default (grey)
  return (
    <span 
      className={`badge badge-${variant}`} 
      style={{ cursor: onClick ? "pointer" : "default", ...style }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
