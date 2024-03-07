import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContenxt";
function Header() {
  const { user } = useContext(authContext);
  const { logout } = useContext(authContext);
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/");
    localStorage.clear();
    logout();
  };
  return (
    <nav className="header">
      <h1>JobPortal</h1>
      <div className="nav-grp">
        {user?.user ? (
          <>
            {user?.user?.isAdmin ? (
              <>
                <Link to={"/jobs"}>Jobs</Link>
                <Link to={"/create-job"}>Create-Job</Link>
                <Link to={"/create-job-categorie"}>Create-Job-cat</Link>
                <Link to={"/create-job-type"}>Create-Job-type</Link>
                <Link to={"/all/app"}>Applications</Link>
                <button onClick={logoutHandler}>Logout</button>
              </>
            ) : (
              <>
                <Link to={"/jobs"}>Jobs</Link>
                <Link to={"/user/" + user?.user?._id}>Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
              </>
            )}
          </>
        ) : (
          <>
            <Link to={"/"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
