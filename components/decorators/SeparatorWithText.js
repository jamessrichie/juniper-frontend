import React from "react";

import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";
import SmallAppText from "../appTexts/SmallAppText";

const styles = StyleSheet.create({
  line: {
    alignSelf: "center",
    backgroundColor: colors.lightTextBox.stroke,
    flex: 1,
    height: 1,
  },
  text: {
    alignSelf: "center",
    color: colors.text.tertiary,
    paddingHorizontal: 5,
  },
});

function SeparatorWithText({ children, style }) {
  return (
    <View style={[{ flexDirection: "row" }, style]}>
      <View style={styles.line} />
      <SmallAppText style={styles.text}>{children}</SmallAppText>
      <View style={styles.line} />
    </View>
  );
}

export default SeparatorWithText;
