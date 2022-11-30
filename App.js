import React from "react";
import ForgotPasswordScreen from "./screens/welcome/ForgotPasswordScreen";
import RegistrationScreen from "./screens/welcome/RegistrationScreen";
import SignInScreen from "./screens/welcome/SignInScreen";
import WelcomeNavigationScreen from "./screens/welcome/WelcomeNavigationScreen";

export default function App() {
  global.API_HOST = "http://localhost:8080";
  return <WelcomeNavigationScreen />;
}
