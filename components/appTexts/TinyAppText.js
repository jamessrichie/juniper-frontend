import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

const styles = StyleSheet.create({
  text: {
    fontSize: defaultStyles.systemFontSize.tiny,
  },
});

function TinyAppText({ children, style, weight, ...otherProps }) {
  return (
    <AppText weight={weight} style={[styles.text, style]} {...otherProps}>
      {children}
    </AppText>
  );
}
export default TinyAppText;
