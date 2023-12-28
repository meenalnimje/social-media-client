import "./Signup.scss";

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { SiMediamarkt } from "react-icons/si";
import { axiosClient } from "../../utiles/axiosClient";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/auth/signup", {
        name,
        email,
        password,
      });
      // console.log("user created");
    } catch (e) {
      console.log("this error is from signup side", e);
    }
  }
  return (
    <div className="container center">
      <div className="signup">
        <h2 className="heading">Sign up</h2>
        <form className="signup-form">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" className="btn-primary" onClick={handleSubmit} />
        </form>
        {/* <button className="btn-primary google-btn" onClick={handleGoogleSignup}>
          signup with google
        </button> */}
        <p className="login-link">
          Already have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
