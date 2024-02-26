import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    console.log(name);
    try {
      // const response = await axios.post("http://localhost:1996/api/register", {
      const response = await axios.post("http://localhost:3290/api/register", {
        name,
        email,
        password,
      });
      console.log(response.data);
      // If registration is successful, setRedirect to true to trigger redirection
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form className="mt-200" onSubmit={(e) => submit(e)}>
          <h1 className="h3 mb-3 fw-normal">Please Register here</h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>

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
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;
