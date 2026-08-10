import React from "react";

export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  iconRight,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div className={iconRight ? "input-wrapper" : ""}>
        <input
          id={id}
          type={type}
          className={`form-control ${iconRight ? "has-icon-right" : ""} ${error ? "input-error" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          {...props}
        />
        {iconRight && <div className="toggle-password-btn">{iconRight}</div>}
      </div>
      {error && <span style={{ color: "var(--status-red)", fontSize: "11px", marginTop: "4px", display: "block" }}>{error}</span>}
    </div>
  );
}
