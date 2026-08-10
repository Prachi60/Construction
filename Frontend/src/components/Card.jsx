import React from "react";

export default function Card({ title, children, actions, className = "", bodyStyle = {} }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>{title}</h3>
          {actions && <div>{actions}</div>}
        </div>
      )}
      <div className="card-body" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
}
