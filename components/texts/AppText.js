import React from "react";
import { StyleSheet, Text } from "react-native";

import { useFonts } from "expo-font";

function AppText({ children, color, fontSize, style, weight = "regular" }) {
  const [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/NunitoSans-Light.ttf"),
    regular: require("../../assets/fonts/NunitoSans-Regular.ttf"),
    bold: require("../../assets/fonts/NunitoSans-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    text: {
      color,
      fontFamily: weight,
      fontSize,
    },
  });

  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default AppText;
