import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = ({data, getData}) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenData = localStorage.getItem("token");
    setToken(tokenData);
  }, [data]);

  const logout = async () => {
    try {
      if (token) {
        const response = await axios.post("http://localhost:3290/api/logout", {
          headers: {
            authorization: token,
          },
        });

        console.log("Logging out ", response.data);

        localStorage.removeItem("token");
        getData("");
        navigate("/login");
      } else {
        console.log("No token");
      }
    } catch (error) {
      console.error("Logging out FAILED:", error);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          {data && <Link className="navbar-brand" to="/">
            Home
          </Link>
          }<button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            {!data && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            )}
            {data && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
