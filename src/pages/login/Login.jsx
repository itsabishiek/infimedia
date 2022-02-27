import React from "react";
import { Google } from "@mui/icons-material";
import GoogleLogin from "react-google-login";
import logo from "../../assets/logo.svg";
import "./Login.css";

const Login = () => {
  const handleResponse = (response) => {};

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="" height="60px" />
        <span>InfiMedia</span>
      </div>

      <div>
        <GoogleLogin
          clientId=""
          render={(renderProps) => (
            <button
              type="button"
              className="login-btn"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <Google />
              <span>Sign in with Google</span>
            </button>
          )}
          onSuccess={handleResponse}
          onFailure={handleResponse}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
};

export default Login;
