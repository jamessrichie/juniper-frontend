import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";

const styles = StyleSheet.create({
  line: {
    alignSelf: "center",
    backgroundColor: colors.lightTextBox.stroke,
    flex: 1,
    height: 1,
  },
});

function Separator({ style }) {
  return (
    <View style={[{ flexDirection: "row" }, style]}>
      <View style={styles.line} />
    </View>
  );
}

export default Separator;
