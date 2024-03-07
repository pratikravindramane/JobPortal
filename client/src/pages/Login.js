import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContenxt";
import { Link } from "react-router-dom";
import { ForgotValidate, loginValidate } from "../utils/ValidateInputs";

const Login = () => {
  const { login } = useContext(authContext);
  const [serverError, setServerError] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(loginValidate(data)).length > 0) {
      return setError(loginValidate(data));
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        data
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login(response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/jobs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const forgotHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(ForgotValidate(data)).length > 0) {
      return setError(ForgotValidate(data));
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/user/forgot",
        data
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        alert("Reset password url send to Your Email");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        {serverError && <h3>{serverError}</h3>}
        <div className="input-lablel">
          <input
            type="text"
            id="email"
            onChange={changeHandler}
            placeholder="Email"
          />
          {error?.email && <label className="error">{error.email}</label>}
        </div>
        <div className="input-lablel">
          <input
            type="password"
            id="password"
            onChange={changeHandler}
            placeholder="Password"
          />
          {error?.password && <label className="error">{error.password}</label>}
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={forgotHandler}>
          forgot password
        </button>
        <Link to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
