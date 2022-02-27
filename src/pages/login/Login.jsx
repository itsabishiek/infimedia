import React from "react";
import { useNavigate } from "react-router-dom";
import { Google } from "@mui/icons-material";
import GoogleLogin from "react-google-login";
import logo from "../../assets/logo.svg";
import { client } from "../../client";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleResponse = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="login-container">
      <div className="login-logo">
        <img src={logo} alt="" height="60px" />
        <span>InfiMedia</span>
      </div>

      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
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
