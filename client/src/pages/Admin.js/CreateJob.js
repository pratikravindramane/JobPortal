import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { jobValidation } from "../../utils/ValidateInputs";
const CreateJob = () => {
  const [serverError, setServerError] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState({});
  const [cat, setCat] = useState([]);
  const [type, setType] = useState([]);
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const cat = await axios.get(`http://localhost:3000/admin/all/job-cat`);
        const type = await axios.get(
          `http://localhost:3000/admin/all/job-type`
        );
        if (cat.data.message) {
          setServerError(cat.data.message);
        } else if (type.data.message) {
          setServerError(type.data.message);
        } else {
          setCat(cat.data);
          setType(type.data);
        }
      } catch (error) {
        setServerError(error.message);
      }
    };
    fetch();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(jobValidation(data)).length > 0) {
      return setError(jobValidation(data));
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/admin/create/job",
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
        navigate("/jobs");
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
            id="title"
            onChange={changeHandler}
            placeholder="Title"
          />
          {error?.title && <label className="error">{error.title}</label>}
        </div>
        <div className="input-lablel">
          <label></label>
          <input
            type="text"
            id="companyDetails"
            onChange={changeHandler}
            placeholder="Company Details"
          />
          {error?.companyDetails && (
            <label className="error">{error.companyDetails}</label>
          )}
        </div>
        <div className="input-lablel">
          <label>Categorie</label>
          <select id="cat" onChange={changeHandler}>
            {cat?.map((e) => (
              <option value={e.categorie} key={e._id}>
                {e.categorie}
              </option>
            ))}
          </select>
          {error?.cat && <label className="error">{error.cat}</label>}
        </div>
        <div className="input-lablel">
          <label>Type</label>
          <select id="type" onChange={changeHandler}>
            {type?.map((e) => (
              <option value={e.type} key={e._id}>
                {e.type}
              </option>
            ))}
          </select>
          {error?.type && <label className="error">{error.type}</label>}
        </div>
        <div className="input-lablel">
          <input
            type="text"
            id="skills"
            onChange={changeHandler}
            placeholder="Skills"
          />
          {error?.skills && <label className="error">{error.skills}</label>}
        </div>
        <div className="input-lablel">
          <input
            type="number"
            id="experience"
            onChange={changeHandler}
            placeholder="Experience"
          />
          {error?.experience && (
            <label className="error">{error.experience}</label>
          )}
        </div>
        <div className="input-lablel">
          <input
            type="text"
            id="desc"
            onChange={changeHandler}
            placeholder="Description"
          />
          {error?.desc && <label className="error">{error.desc}</label>}
        </div>
        <div className="input-lablel">
          <input
            type="text"
            id="tags"
            onChange={changeHandler}
            placeholder="Tags"
          />
          {error?.tags && <label className="error">{error.tags}</label>}
        </div>
        <div className="input-lablel">
          <input
            type="text"
            id="salary"
            onChange={changeHandler}
            placeholder="Salary"
          />
          {error?.salary && <label className="error">{error.salary}</label>}
        </div>
        {/* todo additional info */}
        {/* <div>
          <label>Title</label>
          <input type="text" id="additionalInfo" onChange={changeHandler} />
        </div> */}
        <button type="submit">CreateJob</button>
      </form>
    </div>
  );
};

export default CreateJob;
