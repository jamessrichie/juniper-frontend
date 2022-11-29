import React from "react";
import { StyleSheet } from "react-native";

import TinyAppText from "../appTexts/TinyAppText";

import colors from "../../config/colors";

const styles = StyleSheet.create({
  text: {
    color: colors.error,
  },
});

function AppErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return <TinyAppText style={styles.text}>{error}</TinyAppText>;
}

export default AppErrorMessage;
