import React from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import FlashMessage from "react-native-flash-message";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ForgotPasswordScreen from "./ForgotPasswordScreen";
import RegistrationScreen from "./RegistrationScreen";
import SignInScreen from "./SignInScreen";
import CheckEmailScreen from "./CheckEmailScreen";

import colors from "../../config/colors";

const navigationTheme = {
  colors: {
    background: "transparent",
  },
};

const SlideTransition = {
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            translateX: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width],
                })
              : 0,
          },
        ],
      },
    };
  },
};

const styles = StyleSheet.create({
  background: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: "relative",
    right: 0,
  },
  imageBackground: {
    position: "absolute",
    resizeMode: "contain",
    top: "-75%",
  },
  juniper: {
    bottom: 0,
    height: 50,
    left: 0,
    position: "absolute",
    resizeMode: "contain",
    right: 0,
    top: "11.5%",
    width: undefined,
  },
});

// Screen names
const forgotPasswordScreenName = "forgot";
const registrationScreenName = "register";
const signInScreenName = "login";
const checkEmailScreenName = "checkEmail";

const Stack = createStackNavigator();

function WelcomeNavigationScreen() {
  return (
    <ImageBackground
      imageStyle={styles.imageBackground}
      source={require("../../assets/images/backgrounds/wave.png")}
      style={styles.background}
    >
      <Image
        source={require("../../assets/images/whiteText/juniper.png")}
        style={styles.juniper}
      />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={signInScreenName}
          screenOptions={{
            backgroundImage: require("../../assets/images/backgrounds/wave.png"),
            headerShown: false,
          }}
        >
          <Stack.Screen
            component={CheckEmailScreen}
            name={checkEmailScreenName}
            options={{ ...SlideTransition }}
          />
          <Stack.Screen
            component={ForgotPasswordScreen}
            name={forgotPasswordScreenName}
            options={{ ...SlideTransition }}
          />
          <Stack.Screen
            component={RegistrationScreen}
            name={registrationScreenName}
            options={{ ...SlideTransition }}
          />
          <Stack.Screen
            component={SignInScreen}
            name={signInScreenName}
            options={{ ...SlideTransition }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

export default WelcomeNavigationScreen;
