import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ForgotPasswordScreen from "./ForgotPasswordScreen";
import RegistrationScreen from "./RegistrationScreen";
import SignInScreen from "./SignInScreen";

import colors from "../../config/colors";

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
const forgotPasswordScreenName = "forgot";
const registrationScreenName = "register";
const signInScreenName = "login";

const Stack = createStackNavigator();

function WelcomeNavigationScreen() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={signInScreenName}
        screenOptions={{
          backgroundImage: require("../../assets/images/backgrounds/wave.png"),
          headerShown: false,
        }}
      >
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
  );
}

export default WelcomeNavigationScreen;
