import React from "react";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function HugeAppText({ children, color, style, weight }) {
  return (
    <AppText
      color={color}
      fontSize={defaultStyles.systemFontSize.huge}
      style={style}
      weight={weight}
    >
      {children}
    </AppText>
  );
}

export default HugeAppText;
