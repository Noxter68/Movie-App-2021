import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="input-group">
      <div>
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="form-input">
        <input {...rest} id={name} name={name} className="form-control" />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
