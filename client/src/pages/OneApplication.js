import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const OneApplication = () => {
  const [error, setError] = useState();
  const [app, setApp] = useState();
  const params = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/user/one/app/${params.id}`,
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
          setApp(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetch();
  }, []);

  return (
    <div className="card">
      <p>Title:{app?.title}</p>
      <p>
        Skills:
        {app?.skills.map((s) => {
          return s;
        })}
      </p>
      <p>Experience:{app?.experience}</p>
      <p>Description:{app?.desc}</p>
      <p>Salary:{app?.salary}</p>
      <p>Tags:{app?.tags}</p>
      <p>job Title:{app?.jobId?.title}</p>
      <Link
        to={`/job/${app?.jobId?._id}`}
        style={{
          padding: ".3rem 1rem",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        view job
      </Link>
    </div>
  );
};

export default OneApplication;
