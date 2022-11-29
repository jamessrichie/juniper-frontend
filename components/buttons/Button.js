import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";

function Button({
  children,
  color,
  fillLeft,
  fillRight,
  onPress,
  stroke,
  style,
}) {
  const [fontsLoaded] = useFonts({
    NunitoSansRegular: require("../../assets/fonts/NunitoSans-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    container: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 20,
    },
    button: {
      alignItems: "center",
      borderColor: stroke,
      borderRadius: 100,
      borderWidth: stroke ? 1 : 0,
      justifyContent: "center",
      padding: stroke ? 13 : 14,
    },
    text: {
      color,
      fontSize: defaultStyles.buttonFontSize,
      fontFamily: "NunitoSansRegular",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <LinearGradient
          colors={[fillLeft, fillRight]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.button, style]}
        >
          <Text style={styles.text}>{children}</Text>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Button;
