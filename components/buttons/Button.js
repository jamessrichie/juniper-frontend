import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import defaultStyles from "../../config/styles";

function Button({
  children,
  color,
  fillLeft,
  fillRight,
  onPress,
  stroke,
  style,
  width = "100%",
}) {
  const [fontsLoaded] = useFonts({
    NunitoSansRegular: require("../../assets/fonts/NunitoSans-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      borderColor: stroke,
      borderRadius: 100,
      borderWidth: stroke ? 1 : 0,
      justifyContent: "center",
      padding: stroke ? 13 : 14,
      width,
    },
    text: {
      color,
      fontSize: defaultStyles.buttonFontSize,
      fontFamily: "NunitoSansRegular",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <LinearGradient
        colors={[fillLeft, fillRight]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.button, style]}
      >
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default Button;
