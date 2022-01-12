import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { googleSignIn, emailLogin } = useAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    emailLogin(data.email, data.password);
  };
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
            />{" "}
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Password"
            />{" "}
            <input className="sub-btn" type="submit" value="Login" />
          </form>
          <h4>--------OR---------</h4>
          <button className="sub-btn" onClick={googleSignIn}>
            Google Signin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
