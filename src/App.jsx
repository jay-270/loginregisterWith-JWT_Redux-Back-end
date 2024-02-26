import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Login from "./pages/Login.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./App.css";
import Register from "./pages/Register.jsx";

function App() {
  const [data, setData] = useState("");
  const [token, setToken] = useState("");

  const getData = (token) => {
    setData(token);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar data={data} getData={getData} />
        <Routes>
          <Route
            path="/"
            element={data ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login getData={getData} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
