import React from "react";
import CircularImage from "./CircularImage";

import defaultStyles from "../../config/styles";

function LargeCircularImage({ source, style }) {
  return (
    <CircularImage
      size={defaultStyles.circularImageSize.large}
      source={source}
      style={style}
    />
  );
}

export default LargeCircularImage;
