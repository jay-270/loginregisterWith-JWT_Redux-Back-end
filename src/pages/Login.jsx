import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Navigate } from "react-router-dom";
import Home from "./Home";

const Login = ({ getData }) => {
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getData(token);
    }
  }, [token]);

  const submit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3290/api/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);

      setToken(response.data.token);

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form className="mt-200" onSubmit={submit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
