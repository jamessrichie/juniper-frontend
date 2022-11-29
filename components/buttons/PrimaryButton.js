import React from "react";

import Button from "./Button";

import colors from "../../config/colors";

function PrimaryButton({ children, onPress, style }) {
  return (
    <Button
      color={colors.white}
      fillLeft={colors.juniper.primary}
      fillRight={colors.juniper.secondary}
      onPress={onPress}
      style={style}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
