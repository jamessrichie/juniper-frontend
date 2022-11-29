import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import RegistrationScreen from "./RegistrationScreen";
import SignInScreen from "./SignInScreen";

const styles = StyleSheet.create({
  icon: {
    color: colors.black,
    paddingVertical: 15,
  },
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 0,
    elevation: 20,
    height: 84,
    paddingHorizontal: "6%",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

const navigationTheme = {
  colors: {
    background: colors.white,
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

// Screen names
const forgotPasswordScreenName = "reset";
const registrationScreenName = "register";
const signInScreenName = "login";

const Stack = createStackNavigator();

function WelcomeNavigationScreen() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={forgotPasswordScreenName}
        screenOptions={{
          headerShown: false,
          backgroundImage: require("../../assets/images/backgrounds/wave.png"),
        }}
      >
        <Stack.Screen
          name={forgotPasswordScreenName}
          component={ForgotPasswordScreen}
          options={{ ...SlideTransition }}
        />
        <Stack.Screen
          name={registrationScreenName}
          component={RegistrationScreen}
          options={{ ...SlideTransition }}
        />
        <Stack.Screen
          name={signInScreenName}
          component={SignInScreen}
          options={{ ...SlideTransition }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default WelcomeNavigationScreen;
