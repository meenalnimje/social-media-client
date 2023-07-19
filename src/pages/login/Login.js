import React, { useState } from "react";
import "./Login.scss";
import { SiMediamarkt } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../utiles/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utiles/localStorageManager";
import { useRef } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const passwordRef = useRef(false);
  // const { loginWithRedirect } = useAuth0();
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      // console.log(response);
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate("/");
    } catch (e) {
      console.log("this error is from login side", e);
    }
  }
  function handleShowPassword() {
    if (showPassword) {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
    setShowPassword(!showPassword);
  }
  return (
    <div className="container center">
      <div className="login">
        <div className="icon">
          <SiMediamarkt />
        </div>
        <h2 className="heading">Login</h2>
        <form className="login-form">
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
            ref={passwordRef}
          />
          <label htmlFor="showpassword">show password</label>
          <input
            type="checkbox"
            name="showpassword"
            id="showpassword"
            checked={showPassword ? false : true}
            onClick={handleShowPassword}
          />
          <input type="submit" className="btn-primary" onClick={handleSubmit} />
        </form>
        {/* <button className="btn-primary google-btn" onClick={handleGoogleAuth}>
          login with google
        </button> */}
        {/* <h2>or</h2> */}
        {/* <button
          onClick={() => loginWithRedirect()}
          className="btn-primary google-btn"
        >
          Log in
        </button> */}
        <p className="signup-link">
          Do not have an account?<Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
