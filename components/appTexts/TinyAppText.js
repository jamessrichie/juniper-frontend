import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function TinyAppText({ children, style, weight }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: defaultStyles.systemFontSize.tiny,
    },
  });
  return (
    <AppText style={[styles.text, style]} weight={weight}>
      {children}
    </AppText>
  );
}
export default TinyAppText;
