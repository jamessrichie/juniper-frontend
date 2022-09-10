import React from "react";

import Button from "./Button";

import colors from "../../config/colors";

function PrimaryButton({ children, onPress, style, width }) {
  return (
    <Button
      color={colors.white}
      fillLeft={colors.juniper.primary}
      fillRight={colors.juniper.secondary}
      onPress={onPress}
      style={style}
      width={width}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
