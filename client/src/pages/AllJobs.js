import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AllJobs = () => {
  const [error, setError] = useState();
  const [jobs, setJobs] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:3000/user/all/jobs`,
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
  }, []);
  return (
    <div className="all-job">
      {jobs?.map((e) => {
        return (
          <div key={e._id} className="card">
            <p>Title:{e?.title}</p>
            <p>Company Details :{e?.companyDetails}</p>
            <p>Categorie:{e?.cat}</p>
            <p>Type:{e?.type}</p>
            <p>Skills:{e?.skills}</p>
            <p>Experience:{e?.experience}</p>
            <p>Description:{e?.desc}</p>
            <p>Salary:{e?.salary}</p>
            <p>Tags:{e?.tags}</p>
            <p>Applicants:{e?.applications?.length}</p>
            <button
              onClick={(j) => {
                j.preventDefault();
                navigate(`/job/${e._id}`);
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

export default AllJobs;
