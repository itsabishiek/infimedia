import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./Signup.css";
import { client } from "../../client";
import { useNavigate } from "react-router-dom";

const Signup = ({ alert, setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match!",
        type: "warning",
      });
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(user);

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
      <TextField
        variant="outlined"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        style={{ color: "#fafafa" }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
