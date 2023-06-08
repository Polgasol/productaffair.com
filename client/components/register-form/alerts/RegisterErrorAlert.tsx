import React from 'react';

const RegisterErrorAlert = ({ errors }: any) => {

  return (
    <div>
      {errors.verificationCode?.message}
    </div>
  );
};

export default RegisterErrorAlert;
