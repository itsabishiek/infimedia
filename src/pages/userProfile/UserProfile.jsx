import React, { useEffect, useState } from "react";
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
import { MasonryLayout, Spinner } from "../../components";
import { Logout } from "@mui/icons-material";

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
    <div className="user-profile">
      <div className="user-profile-container">
        <div className="user-profile-inner">
          <div className="user-profile-img-container">
            <img
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img src={user?.image} alt="" />
          </div>
          <h1 className="user-profile-title">{user?.userName}</h1>
          <div className="user-profile-logout" onClick={logOut}>
            <Logout />
          </div>
        </div>

        <div className="user-profile-content">
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? "activeBtnStyles" : "notActiveBtnStyles"
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText(e.target.textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? "activeBtnStyles" : "notActiveBtnStyles"
            }`}
          >
            Saved
          </button>
        </div>

        <div>
          <MasonryLayout pins={pins} />
        </div>

        {pins?.length === 0 && <div>No Pins Found!</div>}
      </div>
    </div>
  );
};

export default UserProfile;
