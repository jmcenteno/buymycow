import React from 'react';

const FormError = ({ message }) => {
  return (
    <span className="help-block text-danger">
      { message }
    </span>
  );
}

export default FormError;
