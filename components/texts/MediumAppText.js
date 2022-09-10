import React from "react";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function MediumAppText({ children, color, style, weight }) {
  return (
    <AppText
      color={color}
      fontSize={defaultStyles.systemFontSize.medium}
      style={style}
      weight={weight}
    >
      {children}
    </AppText>
  );
}

export default MediumAppText;
