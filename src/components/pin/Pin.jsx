import { CallMade, Download, Save } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { client } from "../../client";
import { fetchUser } from "../../utils/fetchUser";
import { v4 as uuidv4 } from "uuid";
import "./Pin.css";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();

  const user = fetchUser();
  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.uid
  )?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.uid,
            postedBy: {
              _type: "postedBy",
              _ref: user.uid,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div className="pin-container">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin/${_id}`)}
        className="pin-inner"
      >
        <img className="pin-img" src={image?.asset?.url} alt="" />

        {postHovered && (
          <div className="pin-hover">
            <div className="pin-hover-top">
              <div className="pin-hover-download">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 5,
                  }}
                >
                  <Download fontSize="small" />
                  <span className="pin-hover-download-inner">Download</span>
                </a>
              </div>
              {alreadySaved ? (
                <button type="button" className="pin-hover-save">
                  <Save fontSize="small" />{" "}
                  <span className="pin-hover-save-inner">
                    {save?.length} Saved
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="pin-hover-save"
                >
                  <Save fontSize="small" />{" "}
                  <span className="pin-hover-save-inner">Save</span>
                </button>
              )}
            </div>
            <div className="pin-hover-bottom">
              {destination?.slice(8).length > 0 && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="pin-destination"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CallMade
                    style={{
                      background: "var(--primary-color)",
                      borderRadius: "50%",
                      color: "white",
                      padding: 3,
                      marginRight: 4,
                    }}
                  />
                  <span>{destination?.slice(8, 20)}...</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <Link to={`/user/${postedBy?._id}`} className="pin-postedby">
        <img src={postedBy?.image} alt="" />
        <h4>{postedBy?.userName}</h4>
      </Link>
    </div>
  );
};

export default Pin;
