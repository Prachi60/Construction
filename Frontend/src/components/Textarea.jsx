import React from "react";

export default function Textarea({
  label,
  id,
  placeholder,
  value,
  onChange,
  required = false,
  rows = 3,
  className = "",
  disabled = false
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        disabled={disabled}
      />
    </div>
  );
}
