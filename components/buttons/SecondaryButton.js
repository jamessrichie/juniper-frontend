import React from "react";

import Button from "./Button";

import colors from "../../config/colors";

function PrimaryButton({ children, onPress, style, width }) {
  return (
    <Button
      color={colors.lightTextBox.placeholder}
      fillLeft={colors.lightTextBox.fill}
      fillRight={colors.lightTextBox.fill}
      onPress={onPress}
      stroke={colors.lightTextBox.stroke}
      style={style}
      width={width}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
