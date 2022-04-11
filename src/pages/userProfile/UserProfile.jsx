import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";
import "./UserProfile.css";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../utils/data";
import { client } from "../../client";
import { Spinner } from "../../components";

const UserProfile = ({ alert, setAlert }) => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const query = userCreatedPinsQuery(userId);

      client.fetch(query).then((data) => {
        setPins(data);
      });
    } else {
      const query = userSavedPinsQuery(userId);

      client.fetch(query).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logOut = () => {
    signOut(auth);

    navigate("/", { replace: true });

    setAlert({
      open: true,
      message: "Logout Successful",
      type: "success",
    });
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button variant="contained" onClick={logOut} style={{ color: "white" }}>
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
