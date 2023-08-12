import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import PrimaryButton from "./PrimaryButton";

import defaultStyles from "../../config/styles";

const styles = StyleSheet.create({
  button: {
    width: 48,
  },
});

function PrimaryIconButton({ icon, onPress, style }) {
  return (
    <View style={style}>
      <PrimaryButton style={styles.button} onPress={onPress}>
        <Ionicons name={icon} size={defaultStyles.iconSize.inline} />
      </PrimaryButton>
    </View>
  );
}

export default PrimaryIconButton;
