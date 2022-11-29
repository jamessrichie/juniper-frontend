import React from "react";
import { StyleSheet } from "react-native";

import AppText from "./AppText";

import defaultStyles from "../../config/styles";

function LargeAppText({ children, style, weight }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: defaultStyles.systemFontSize.large,
    },
  });
  return (
    <AppText style={[styles.text, style]} weight={weight}>
      {children}
    </AppText>
  );
}
export default LargeAppText;
