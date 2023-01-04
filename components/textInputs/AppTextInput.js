import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";

function AppTextInput({ icon, marginVertical, style, ...otherProps }) {
  const [fontsLoaded] = useFonts({
    NunitoSansRegular: require("../../assets/fonts/NunitoSans-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  const styles = StyleSheet.create({
    container: {
      borderColor: colors.lightTextBox.stroke,
      borderRadius: 1000,
      borderWidth: 1,
      flexDirection: "row",
      marginVertical,
    },
    icon: {
      color: colors.lightTextBox.placeholder,
      paddingLeft: 16,
      paddingRight: 11,
      paddingVertical: 15,
    },
    text: {
      fontFamily: "NunitoSansRegular",
      fontSize: defaultStyles.systemFontSize.small,
      flexGrow: 1,
      marginRight: 8,
      paddingRight: 8,
      paddingVertical: Platform.OS === "ios" ? 15 : 0,
      width: "0%",
    },
  });

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <Ionicons
          name={icon}
          size={defaultStyles.iconSize.inline}
          style={styles.icon}
        />
      )}
      <TextInput
        style={[styles.text]}
        placeholderTextColor={colors.lightTextBox.placeholder}
        {...otherProps}
      ></TextInput>
    </View>
  );
}

export default AppTextInput;
