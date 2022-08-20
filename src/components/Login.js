import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/AlertContext";

export default function Login() {
const context = useContext(alertContext);
  const {showAlert} = context
  
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email_address: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3002/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: credentials.email_address,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      showAlert("Success","Logged In Successfully.","success")
    }
    else{
        showAlert("Error","Invalid credentials.","danger")    
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
        <div className="container my-3 mt-4">
        <h2 className="my-3 mt-4">Login to access iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email_address" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email_address"
            onChange={handleChange}
            value={credentials.email_address}
            name="email_address"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={handleChange}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      </div>
    </div>
  );
}
