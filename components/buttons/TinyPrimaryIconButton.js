import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TinyButton from "./TinyButton";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";

function TinyPrimaryIconButton({ icon, onPress, style }) {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      paddingLeft: icon === "add" ? 3.5 : null,
      width: 25,
    },
  });

  return (
    <View style={style}>
      <TinyButton
        color={colors.white}
        fillLeft={colors.juniper.primary}
        fillRight={colors.juniper.secondary}
        onPress={onPress}
        style={styles.button}
      >
        <Ionicons name={icon} size={defaultStyles.iconSize.tiny} />
      </TinyButton>
    </View>
  );
}

export default TinyPrimaryIconButton;
