import React from "react";

import Button from "./Button";

import colors from "../../config/colors";

function SecondaryButton({ children, onPress, style }) {
  return (
    <Button
      color={colors.lightTextBox.placeholder}
      fillLeft={colors.lightTextBox.fill}
      fillRight={colors.lightTextBox.fill}
      onPress={onPress}
      style={style}
    >
      {children}
    </Button>
  );
}

export default SecondaryButton;
