import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { authContext } from "../context/AuthContenxt";
import { Link } from "react-router-dom";

const User = () => {
  const [error, setError] = useState();
  const [users, setUser] = useState();
  const [status, setStatus] = useState();
  const [app, setApp] = useState();
  const { user } = useContext(authContext);

  const param = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/user/${param.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const app = await axios.get(
          `http://localhost:3000/user/app/${param.id}`,
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
          setApp(app.data);
          setUser(response.data);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetch();
  }, []);

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
    <div>
      {error && <h3>{error}</h3>}
      <div
        style={{
          margin: "1rem 5rem",
          padding: "1rem",
          borderRadius: "10px",
          background: "#ebebeb",
        }}
      >
        <p>Name: {users?.name}</p>
        <p>Email: {users?.email}</p>
        <p>Phone: {users?.phone}</p>
      </div>

      <div className="all-app">
        {app?.map((e) => {
          return (
            <div key={e._id} className="card">
              <p>job:{e?.jobId?.title}</p>
              <p>Status:{e?.status}</p>
              <p>Resume:{e?.resume}</p>
              <Link
                to={`/job/${e?.jobId?._id}`}
                style={{
                  padding: ".3rem 1rem",
                  border: "1px solid black",
                  borderRadius: "10px",
                }}
              >
                view job
              </Link>
              {user?.user?.isAdmin && (
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
                  <button onClick={(j) => statusHandler(e._id, j)}>
                    change
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
