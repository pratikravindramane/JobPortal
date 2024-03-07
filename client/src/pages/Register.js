import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validate } from "../utils/ValidateInputs";

const Register = () => {
  const [error, setError] = useState();
  const [serverError, setServerError] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(validate(data)).length > 0) {
      return setError(validate(data));
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        data
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        {serverError && <h3>{serverError}</h3>}
        <div>
          <label>name</label>
          <input type="text" id="name" onChange={changeHandler} />
          {error?.name && <label className="error">{error.name}</label>}
        </div>
        <div>
          <label>phone</label>
          <input type="number" id="phone" onChange={changeHandler} />
          {error?.phone && <label className="error">{error.phone}</label>}
        </div>
        <div>
          <label>Email</label>
          <input type="text" id="email" onChange={changeHandler} />
          {error?.email && <label className="error">{error.email}</label>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" onChange={changeHandler} />
          {error?.password && <label className="error">{error.password}</label>}
        </div>
        <button type="submit">Register</button>
        <Link to={"/"}>Login</Link>
      </form>
    </div>
  );
};

export default Register;
