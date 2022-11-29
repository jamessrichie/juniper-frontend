import React from "react";
import { StyleSheet } from "react-native";

import CardText from "./CardText";

import defaultStyles from "../../config/styles";

const styles = StyleSheet.create({
  text: {
    fontSize: defaultStyles.cardFontSize.medium,
  },
});

function MediumCardText({ children, style }) {
  return (
    <CardText style={[styles.text, style]} weight={"semiBold"}>
      {children}
    </CardText>
  );
}

export default MediumCardText;
