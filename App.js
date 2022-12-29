import React from "react";
import { StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";

import ForgotPasswordScreen from "./screens/welcome/ForgotPasswordScreen";
import RegistrationScreen from "./screens/welcome/RegistrationScreen";
import SignInScreen from "./screens/welcome/SignInScreen";
import WelcomeNavigationScreen from "./screens/welcome/WelcomeNavigationScreen";

import colors from "./config/colors";

FlashMessage.setColorTheme({
  success: colors.success,
  info: colors.white,
  warning: colors.warning,
  danger: colors.error,
});

const styles = StyleSheet.create({
  flashMessage: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 20,
  },
});

export default function App() {
  global.API_HOST = "http://10.18.163.20:8080";

  return (
    <>
      <SignInScreen />
      <FlashMessage
        position="bottom"
        floating={true}
        style={styles.flashMessage}
      />
    </>
  );
}
