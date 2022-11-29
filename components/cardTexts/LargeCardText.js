import React from "react";
import { StyleSheet } from "react-native";

import CardText from "./CardText";

import defaultStyles from "../../config/styles";

const styles = StyleSheet.create({
  text: {
    fontSize: defaultStyles.cardFontSize.large,
  },
});

function LargeCardText({ children, style }) {
  return (
    <CardText style={[styles.text, style]} weight={"bold"}>
      {children}
    </CardText>
  );
}

export default LargeCardText;
