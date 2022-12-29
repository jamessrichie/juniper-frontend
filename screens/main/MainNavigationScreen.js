import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import MainNavigationHeader from "./MainNavigationHeader";
import DiscoverScreen from "./tabs/discover/DiscoverScreen";
import SearchScreen from "./tabs/search/SearchScreen";
import MessageScreen from "./tabs/message/MessageScreen";
import ProfileScreen from "./tabs/profile/ProfileScreen";

import colors from "../../config/colors";
import defaultStyles from "../../config/styles";

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
      height: 0,
      width: 0,
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

// Screen names
const discoverScreenName = "discover";
const searchScreenName = "search";
const messageScreenName = "message";
const profileScreenName = "profile";

const Tab = createBottomTabNavigator();

function MainNavigationScreen() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        initialRouteName={discoverScreenName}
        screenOptions={({ route }) => ({
          header: () => {
            let image;

            if (route.name === messageScreenName) {
              image = require("../../assets/images/gradientText/chat.png");
            } else if (route.name === profileScreenName) {
              image = require("../../assets/images/gradientText/profile.png");
            } else if (route.name === searchScreenName) {
              image = require("../../assets/images/gradientText/search.png");
            } else {
              image = require("../../assets/images/gradientText/juniper.png");
            }

            return <MainNavigationHeader image={image} />;
          },
          tabBarIcon: ({ focused }) => {
            let icon;

            if (route.name === messageScreenName) {
              icon = focused ? "chatbubbles" : "chatbubbles-outline";
            } else if (route.name === profileScreenName) {
              icon = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === searchScreenName) {
              icon = focused ? "search" : "search-outline";
            } else {
              icon = focused ? "home" : "home-outline";
            }
            return (
              <Ionicons
                name={icon}
                size={defaultStyles.iconSize.navbar}
                style={styles.icon}
              />
            );
          },
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name={discoverScreenName} component={DiscoverScreen} />
        <Tab.Screen name={searchScreenName} component={SearchScreen} />
        <Tab.Screen name={messageScreenName} component={MessageScreen} />
        <Tab.Screen name={profileScreenName} component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigationScreen;
