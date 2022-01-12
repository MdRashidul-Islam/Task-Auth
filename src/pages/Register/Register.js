import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Register = () => {
  const { registerUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    // setLoginData(data);
    if (data.password1 !== data.password2) {
      Swal.fire("Opps!", "Your Password did not match!", "error");
      return;
    }
    registerUser(data.email, data.password2, data.name);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="form">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="YOUR NAME"
            />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="YOUR EMAIL"
            />

            <input
              type="password"
              {...register("password1", { required: true })}
              placeholder="TYPE-PASSWORD"
            />
            <input
              type="password"
              {...register("password2", { required: true })}
              placeholder="RE-TYPE-PASSWORD"
            />
            <input className="sub-btn" type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
