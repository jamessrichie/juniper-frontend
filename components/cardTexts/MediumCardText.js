import React from "react";
import { StyleSheet } from "react-native";

import CardText from "./CardText";

import defaultStyles from "../../config/styles";

function MediumCardText({ children, style }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: defaultStyles.cardFontSize.medium,
    },
  });
  return (
    <CardText style={[styles.text, style]} weight={"semiBold"}>
      {children}
    </CardText>
  );
}

export default MediumCardText;
