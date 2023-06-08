import React from 'react';

const VerifyAlert = ({ errors }: any) => {

  return (
    <div>
      {errors.firstname?.message}
      <br />
      {errors.lastname?.message}
      <br />
      {errors.email?.message}
      <br />
      {errors.age?.message}
      <br />
      {errors.username?.message}
      <br />
      {errors.createPassword?.message}
      <br />
      {errors.confirmPassword?.message}
      <br />
    </div>
  );
};

export default VerifyAlert;