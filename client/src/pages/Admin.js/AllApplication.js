import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AllApplications = () => {
  const [error, setError] = useState();
  const [jobs, setJobs] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/admin/all/application`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        if (response.data.message) {
          setError(response.data.message);
        } else {
          setJobs(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetch();
  });
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
        alert("application submmited");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="all-app">
      {jobs?.map((e) => {
        return (
          <div key={e._id} className="card">
            <p>applicant name : {e?.userId?.name}</p>
            <p>Job Title : {e?.jobId?.title}</p>
            <p>Resume : {e?.resume}</p>
            <p>Score : {e?.score}% matched</p>
            <p>Status : {e?.status}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <select
                name="status"
                id="status"
                onChange={(j) => setStatus(j.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
              <button onClick={(j) => statusHandler(e._id, j)}>change</button>
            </div>
            <button
              onClick={(j) => {
                j.preventDefault();
                navigate(`/app/${e._id}`);
              }}
            >
              view
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AllApplications;
