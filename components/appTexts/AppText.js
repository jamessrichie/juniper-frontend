import React from "react";
import { StyleSheet, Text } from "react-native";

import { useFonts } from "expo-font";

function AppText({ children, style, weight = "regular", ...otherProps }) {
  const [fontsLoaded] = useFonts({
    light: require("../../assets/fonts/NunitoSans-Light.ttf"),
    regular: require("../../assets/fonts/NunitoSans-Regular.ttf"),
    semiBold: require("../../assets/fonts/NunitoSans-SemiBold.ttf"),
    bold: require("../../assets/fonts/NunitoSans-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    text: {
      fontFamily: weight,
    },
  });

  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
