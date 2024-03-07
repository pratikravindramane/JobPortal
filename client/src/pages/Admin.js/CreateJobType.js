import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TypeValidate } from "../../utils/ValidateInputs";

const CreateJobType = () => {
  const [error, setError] = useState({});
  const [data, setData] = useState();
  const [serverError, setServerError] = useState();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(TypeValidate(data)).length > 0) {
      return setError(TypeValidate(data));
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/admin/job-type",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        alert("Type Added");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        {serverError && (
          <>
            <h3>{serverError}</h3>
          </>
        )}
        <div>
          <input
            type="text"
            id="type"
            onChange={changeHandler}
            placeholder="Type"
          />
          {error?.type && <label className="error">{error.type}</label>}
        </div>
        <button type="submit" className="submit-btn">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateJobType;
