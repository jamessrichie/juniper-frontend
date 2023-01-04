import React from "react";
import CircularImage from "./CircularImage";

import defaultStyles from "../../config/styles";

function SmallCircularImage({ source, style }) {
  return (
    <CircularImage
      size={defaultStyles.circularImageSize.small}
      source={source}
      style={style}
    />
  );
}

export default SmallCircularImage;
