import React from "react";
import { Platform } from "react-native";

import Button from "./Button";

import colors from "../../config/colors";

function SecondaryButton({ children, onPress, style }) {
  return (
    <Button
      color={colors.lightTextBox.placeholder}
      fillLeft={colors.lightTextBox.fill}
      fillRight={colors.lightTextBox.fill}
      onPress={onPress}
      stroke={Platform.OS === "ios" ? colors.white : colors.lightTextBox.stroke}
      style={style}
    >
      {children}
    </Button>
  );
}

export default SecondaryButton;
