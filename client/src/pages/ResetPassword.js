import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { passValidate } from "../utils/ValidateInputs";
import axios from "axios";

const ResetPassword = () => {
  const params = useParams();
  const [error, setError] = useState();
  const [password, setPassword] = useState();
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(passValidate({ password })).length > 0) {
      return setError(passValidate({ password }));
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/user/reset/${params.token}`,
        { password }
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
          <label>Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error?.password && <label className="error">{error.password}</label>}
        </div>
        <button type="submit">submit</button>
        <Link to={"/"}>Login</Link>
      </form>
    </div>
  );
};

export default ResetPassword;
