import React from "react";
import CircularImage from "./CircularImage";

import defaultStyles from "../../config/styles";

function HugeCircularImage({ source, style }) {
  return (
    <CircularImage
      size={defaultStyles.circularImageSize.huge}
      source={source}
      style={style}
    />
  );
}

export default HugeCircularImage;
