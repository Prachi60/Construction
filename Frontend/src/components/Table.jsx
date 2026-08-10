import React from "react";

export default function Table({ headers = [], children, className = "" }) {
  return (
    <div className="table-responsive">
      <table className={`data-table ${className}`}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
