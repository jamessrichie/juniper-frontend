import React from "react";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function TinyAppText({ children, color, style, weight }) {
  return (
    <AppText
      color={color}
      fontSize={defaultStyles.systemFontSize.tiny}
      style={style}
      weight={weight}
    >
      {children}
    </AppText>
  );
}

export default TinyAppText;
