import React from "react";

export default function ProgressBar({ progress, label, height = "5px", variant = "blue" }) {
  const roundedProgress = Math.min(Math.max(Math.round(progress), 0), 100);
  
  return (
    <div className="progress-container">
      {label && (
        <div className="progress-header">
          <span>{label}</span>
          <span style={{ fontWeight: 700 }}>{roundedProgress}%</span>
        </div>
      )}
      <div className="progress-bar-bg" style={{ height }}>
        <div 
          className={`progress-bar-fill fill-${variant}`} 
          style={{ width: `${roundedProgress}%` }} 
        />
      </div>
    </div>
  );
}
