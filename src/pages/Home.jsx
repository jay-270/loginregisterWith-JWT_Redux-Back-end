import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import {Navigate} from "react-router-dom";

const Home = ({ token }) => {
  const [name, setName] = useState("");
  const [tokenData, setToken] = useState("");
  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  }, [])
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3290/api/user", {
          headers: {
            Authorization: `{token}` 
          }
        });
        console.log(response.data);
        setName(response.data);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };

    getData();
  }, [token]); 
if(tokenData){
  return (
    <div>
      <h1>Hello User</h1>
    </div>
  );
}
else{
  <Navigate to = "/login"/>
}
};

export default Home;
