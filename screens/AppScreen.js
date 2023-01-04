import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import MainNavigationScreen from "./main/MainNavigationScreen";
import WelcomeNavigationScreen from "./welcome/WelcomeNavigationScreen";

const navigationTheme = {
  colors: {
    background: "transparent",
  },
};

const welcomeNavigationScreenName = "welcome";
const mainNavigationScreenName = "main";

const Stack = createBottomTabNavigator();

function AppScreen(props) {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => null}
      >
        <Stack.Screen
          name={welcomeNavigationScreenName}
          component={WelcomeNavigationScreen}
        />
        <Stack.Screen
          name={mainNavigationScreenName}
          component={MainNavigationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppScreen;
