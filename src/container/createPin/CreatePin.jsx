import { Delete, UploadOutlined } from "@mui/icons-material";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../client";
import { Spinner } from "../../components";
import { fetchCategories } from "../../utils/data";
import "./CreatePin.css";

const CreatePin = ({ user, alert, setAlert }) => {
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    client.fetch(fetchCategories).then((data) => {
      setCategories(data);
    });
  }, []);

  // console.log(categories);

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/jpg" ||
      type === "image/jpeg" ||
      type === "image/svg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setLoading(true);

      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((doc) => {
          setImageAsset(doc);
          setLoading(false);
        })
        .catch((err) => {
          setAlert({
            open: true,
            message: err,
            type: "error",
          });
        });
    } else {
      setAlert({
        open: true,
        message: "Its an invalid file type.",
        type: "warning",
      });
      setLoading(false);
    }
  };

  const publishPin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };

      client.create(doc).then(() => {
        navigate("/", { replace: true });
      });
    } else {
      setAlert({
        open: true,
        message: "All fields are required.",
        type: "warning",
      });
    }
  };

  return (
    <div className="createpin">
      <div className="createpin-wrapper">
        <div className="createpin-left">
          <div className="createpin-left-inner">
            {loading && <Spinner />}
            {!imageAsset ? (
              <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
                {!loading && (
                  <div className="createpin-imageAsset">
                    <div className="createpin-imageAsset-inner">
                      <UploadOutlined
                        color="primary"
                        style={{ fontSize: 60 }}
                      />
                      <span>Click to upload</span>
                    </div>

                    <span className="createpin-imageAsset-recommend">
                      Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF
                      or TIFF less than 20MB
                    </span>
                  </div>
                )}

                <input
                  type="file"
                  id="upload-image"
                  style={{ display: "none" }}
                  onChange={uploadImage}
                />
              </label>
            ) : (
              <div className="uploaded-img">
                <img src={imageAsset?.url} alt="" />
                <button type="button" onClick={() => setImageAsset(null)}>
                  <Delete fontSize="small" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="createpin-right">
          {user && (
            <div className="createpin-user">
              <img src={user?.image} alt="" />
              <p>{user?.userName}</p>
            </div>
          )}
          <TextField
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            label="Title"
            fullWidth
          />
          <TextField
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            variant="outlined"
            label="About"
            fullWidth
          />
          <TextField
            type="url"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            variant="outlined"
            label="Destination"
            fullWidth
          />

          <div className="createpin-right-inner">
            <div className="createpin-right-wrapper">
              <FormControl fullWidth>
                <InputLabel id="label-category">Select Category</InputLabel>
                <Select
                  labelId="label-category"
                  id="category"
                  value={category}
                  label="Select Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((category, i) => (
                    <MenuItem
                      key={i}
                      value={category?.title}
                      style={{ textTransform: "capitalize" }}
                    >
                      {category?.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="createpin-right-btn">
              <Button
                variant="contained"
                style={{
                  display: "flex",
                  width: "100%",
                  color: "#fff",
                }}
                onClick={publishPin}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
