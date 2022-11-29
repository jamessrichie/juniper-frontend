import React from "react";
import { StyleSheet } from "react-native";

import CardText from "./CardText";

import defaultStyles from "../../config/styles";

function SmallCardText({ children, style }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: defaultStyles.cardFontSize.small,
    },
  });
  return (
    <CardText style={[styles.text, style]} weight={"light"}>
      {children}
    </CardText>
  );
}

export default SmallCardText;
