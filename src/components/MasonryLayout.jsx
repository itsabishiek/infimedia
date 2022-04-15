import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./pin/Pin";

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 2,
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry style={{ display: "flex" }} breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} style={{ width: "max-content" }} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
