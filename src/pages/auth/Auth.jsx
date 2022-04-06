import { Google } from "@mui/icons-material";
import { AppBar, Box, Button, Tab, Tabs } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { client } from "../../client";
import { Login, Signup } from "../../components";
import { auth } from "../../firebase";

import "./Auth.css";

const Auth = ({ alert, setAlert }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(({ user }) => {
        setAlert({
          open: true,
          message: `Sign Up Successful, ${user.displayName || user.email}`,
          type: "success",
        });

        localStorage.setItem("user", JSON.stringify(user));

        const doc = {
          _id: user.uid,
          _type: "user",
          userName: user.displayName || user.email,
          image:
            user.photoURL ||
            "https://flyclipart.com/thumb2/avatar-human-male-profile-user-icon-518358.png",
        };

        client.createIfNotExists(doc).then(() => {
          navigate("/", { replace: true });
        });
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-logo">
        <img src={logo} alt="" height="60px" />
        <h2>InfiMedia</h2>
      </div>

      <div style={{ width: "60%", marginTop: 20 }}>
        <AppBar
          position="static"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }}
        >
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>
        </AppBar>

        {value === 0 && <Login alert={alert} setAlert={setAlert} />}

        {value === 1 && <Signup alert={alert} setAlert={setAlert} />}

        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <span style={{ color: "var(--primary-color)", marginBottom: 20 }}>
            (OR)
          </span>

          <Button
            startIcon={<Google />}
            variant="outlined"
            style={{ width: "100%", outline: "none" }}
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Auth;
