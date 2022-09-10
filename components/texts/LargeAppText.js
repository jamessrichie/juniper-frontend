import React from "react";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function LargeAppText({ children, color, style, weight }) {
  return (
    <AppText
      color={color}
      fontSize={defaultStyles.systemFontSize.large}
      style={style}
      weight={weight}
    >
      {children}
    </AppText>
  );
}

export default LargeAppText;
