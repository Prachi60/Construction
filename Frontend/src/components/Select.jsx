import React from "react";

export default function Select({
  label,
  id,
  value,
  onChange,
  required = false,
  options = [],
  className = "",
  disabled = false,
  placeholder = "-- Select --"
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <select
        id={id}
        className="form-control"
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
