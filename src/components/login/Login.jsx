import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../client";
import { Box, Button, TextField } from "@mui/material";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ alert, setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields!",
        type: "warning",
      });
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // console.log(user);

      setAlert({
        open: true,
        message: `Login Successful, ${user.displayName || user.email}`,
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
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 30,
      }}
    >
      <TextField
        variant="outlined"
        label="Enter Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        style={{ color: "#fafafa" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
