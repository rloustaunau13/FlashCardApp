import React from "react";


export const ErrorMessage = ({ error, children }) => {
  return (
    <div>
      <main className="container">
        <p style={{ color: "red" }}>ERROR: {error.message}</p>
        {children}
      </main>
    </div>
  );
};


export default ErrorMessage;
