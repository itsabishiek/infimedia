import { Delete, Download, Save } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { client } from "../../client";
import { v4 as uuidv4 } from "uuid";
import { MasonryLayout, Spinner } from "../../components";
import { fetchPinDetail, similarPinQuery } from "../../utils/data";
import "./PinDetail.css";
import { Button, TextField } from "@mui/material";

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState("");
  const [addingComment, setAddingComment] = useState(false);
  const navigate = useNavigate();

  const fetchPinDetailQuery = () => {
    let query = fetchPinDetail(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = similarPinQuery(data[0]);
          client.fetch(query).then((res) => {
            setPins(res);
          });
          console.log(data[0]);
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetailQuery();
    // eslint-disable-next-line
  }, [pinId]);

  if (!pinDetail) {
    return <Spinner message="Loading Pin..." />;
  }

  const alreadySaved = !!pinDetail?.save?.filter(
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
              _ref: user?._id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const postComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: "postedBy",
              _ref: user?._id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setAddingComment(false);
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  console.log(pinDetail);
  console.log(pins);
  // console.log(user);

  return (
    <>
      <div className="pin-detail-container">
        <div className="pin-detail-img">
          <img src={pinDetail?.image.asset.url} alt="" />

          <button
            className="btn-delete"
            variant="text"
            onClick={() => {
              deletePin(pinDetail?._id);
              navigate("/", { replace: true });
            }}
          >
            <Delete />
          </button>
        </div>

        <div className="pin-detail-inner">
          <Link
            to={`/user/${pinDetail?.postedBy._id}`}
            className="pin-detail-postedBy"
          >
            <img src={pinDetail?.postedBy.image} alt="" />
            <h3>{pinDetail?.postedBy.userName}</h3>
          </Link>

          <div className="pin-detail-download">
            <a
              title="Download"
              href={`${pinDetail?.image?.asset?.url}?dl`}
              download
            >
              <Download />
            </a>

            {alreadySaved ? (
              <button type="button" className="pin-detail-hover">
                <Save /> <span>{pinDetail?.save?.length} Saved</span>
              </button>
            ) : (
              <button
                type="button"
                className="pin-detail-hover"
                onClick={() => savePin(pinDetail?._id)}
              >
                <Save /> <span>Save</span>
              </button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 10, textAlign: "center" }}>
          <h2 className="pin-detail-title">{pinDetail?.title}</h2>

          <p>
            <span style={{ fontWeight: "bold", fontSize: 18 }}>
              About the pin:{" "}
            </span>
            {pinDetail?.about}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div className="pin-detail-comments-inner">
            <h3>Comments</h3>
            {pinDetail?.comments ? (
              <div className="pin-detail-comments">
                {pinDetail?.comments?.map((comment, index) => (
                  <div className="pin-detail-comment" key={index}>
                    <img src={comment?.postedBy?.image} alt="" />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                      }}
                    >
                      <p
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          marginBottom: 2,
                        }}
                      >
                        {comment.comment}
                      </p>
                      <p>{comment?.postedBy?.userName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  height: 75,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <h4>No Comments</h4>
              </div>
            )}

            <div className="pin-detail-post-comment">
              <Link to={`/user/${user?._id}`}>
                <img
                  src={user?.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="user-profile"
                />
              </Link>
              <TextField
                type="text"
                label="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                style={{ color: "#fff" }}
                onClick={postComment}
              >
                {addingComment ? "Posting" : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {pins?.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2
            style={{
              color: "var(--primary-color)",
              paddingLeft: 10,
              marginBottom: 10,
            }}
          >
            More like this
          </h2>

          <div>
            {pins ? (
              <MasonryLayout pins={pins} />
            ) : (
              <Spinner message="Loading more pins" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PinDetail;
