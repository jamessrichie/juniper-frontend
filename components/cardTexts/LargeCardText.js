import React from "react";
import { StyleSheet } from "react-native";

import CardText from "./CardText";

import defaultStyles from "../../config/styles";

function LargeCardText({ children, style }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: defaultStyles.cardFontSize.large,
    },
  });
  return (
    <CardText style={[styles.text, style]} weight={"bold"}>
      {children}
    </CardText>
  );
}

export default LargeCardText;
