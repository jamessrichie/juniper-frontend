import React from "react";
import { StyleSheet } from "react-native";

import colors from "../../config/colors";
import TinyAppText from "../appTexts/TinyAppText";

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
