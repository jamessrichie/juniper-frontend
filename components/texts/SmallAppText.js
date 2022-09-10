import React from "react";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function SmallAppText({ children, color, style, weight }) {
  return (
    <AppText
      color={color}
      fontSize={defaultStyles.systemFontSize.small}
      style={style}
      weight={weight}
    >
      {children}
    </AppText>
  );
}

export default SmallAppText;
