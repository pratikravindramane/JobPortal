import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CatValidate } from "../../utils/ValidateInputs";

const CreateJobCat = () => {
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(CatValidate(data)).length > 0) {
      return setError(CatValidate(data));
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/admin/job-cat",
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
        alert("Categories Added");
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
            <button onClick={setError(false)}>ok</button>
          </>
        )}
        <div>
          <input
            type="text"
            id="categorie"
            onChange={changeHandler}
            placeholder="Categorie"
          />
          {error?.categorie && (
            <label className="error">{error.categorie}</label>
          )}
        </div>

        <button type="submit" className="submit-btn">
          create
        </button>
      </form>
    </div>
  );
};

export default CreateJobCat;
