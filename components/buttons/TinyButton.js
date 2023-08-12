import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";

function TinyButton({
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
        height: 6,
        width: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 6,
    },
    button: {
      alignItems: "center",
      borderColor: stroke,
      borderRadius: 1000,
      borderWidth: stroke ? 1 : 0,
      justifyContent: "center",
      padding: stroke ? 1 : 2,
    },
    text: {
      color,
      fontFamily: "NunitoSansRegular",
      fontSize: defaultStyles.buttonFontSize,
    },
    touch: {
      borderColor: stroke,
      borderRadius: 1000,
    },
  });

  return (
    <TouchableWithoutFeedback style={styles.touch} onPress={onPress}>
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

export default TinyButton;
