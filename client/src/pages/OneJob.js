import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext } from "../context/AuthContenxt";
const OneJob = () => {
  const [error, setError] = useState();
  const [job, setJob] = useState();
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [filled, setFilled] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useContext(authContext).user;
  const params = useParams();
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/user/jobs/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.message) {
          setError(response.data.message);
        } else {
          response?.data?.applications?.filter((element) => {
            if (element.userId._id == user._id) {
              return setFilled(true);
            }
          });
          setJob(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetch();
  });

  // const changeHandler = (e) => {
  //   setData({ ...data, [e.target.id]: e.target.value });
  // };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const decode = jwtDecode(token);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("userId", decode.id);
      console.log(file);
      const response = await axios.post(
        `http://localhost:3000/user/apply/${params.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-dat",
          },
        }
      );
      if (response.data.message) {
        setError(response.data.message);
      } else {
        alert("application submmited");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (id, j) => {
    j.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:3000/admin/application/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message) {
        setError(response.data.message);
      } else {
        alert("Status updated");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      {job && (
        <div key={job._id} className="card" style={{ marginBottom: "1rem" }}>
          <p>Title:{job?.title}</p>
          <p>Company Details :{job?.companyDetails}</p>
          <p>Categorie:{job?.cat}</p>
          <p>Type:{job?.type}</p>
          <p>Skills:{job?.skills}</p>
          <p>Experience:{job?.experience}</p>
          <p>Description:{job?.desc}</p>
          <p>Salary:{job?.salary}</p>
          <p>Tags:{job?.tags}</p>
          <p>applicants:{job?.applications?.length}</p>
        </div>
      )}

      {user?.isAdmin ? (
        <div>
          <h3 style={{ marginBlock: "1rem" }}>Application for this job</h3>
          <div className="all-app">
            {job?.applications?.map((e) => (
              <div className="card">
                <p>applicant name:{e.userId.name}</p>
                <p>Title:{e?.AppId?.title}</p>
                <p>Status:{e?.AppId?.status}</p>
                <p>Resume:{e?.AppId?.resume}</p>
                <p>Score:{e?.AppId?.score}% matched</p>
                <div>
                  <select
                    name="status"
                    id="status"
                    onChange={(j) => setStatus(j.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="selected">Selected</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button
                    onClick={(j) => statusHandler(e.AppId._id, j)}
                    style={{ marginTop: "1rem" }}
                  >
                    change
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filled ? (
        <>
          <p>Already Submitted</p>
        </>
      ) : (
        <>
          <form onSubmit={submitHandler}>
            {error && <h3>{error}</h3>}
            <div className="input-lablel">
              <label htmlFor="image">Image</label>
              <input type="file" id="image" onChange={handleFileChange} />
            </div>
            {/* <div className="input-lablel">
              <label>Title</label>
              <input type="text" id="title" onChange={changeHandler} />
            </div>
            <div className="input-lablel">
              <label>Skills</label>
              <input type="text" id="skills" onChange={changeHandler} />
            </div>
            <div className="input-lablel">
              <label>experience</label>
              <input type="number" id="experience" onChange={changeHandler} />
            </div>
            <div className="input-lablel">
              <label>Description</label>
              <input type="text" id="desc" onChange={changeHandler} />
            </div>
            <div className="input-lablel">
              <label>Salary</label>
              <input type="text" id="salary" onChange={changeHandler} />
            </div>
            <div className="input-lablel">
              <label>tags</label>
              <input type="text" id="tags" onChange={changeHandler} />
            </div> */}
            <button type="submit">Apply</button>
          </form>
        </>
      )}
    </div>
  );
};

export default OneJob;
