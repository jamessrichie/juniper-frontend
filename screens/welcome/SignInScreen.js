import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as SecureStore from "expo-secure-store";

import { Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import HugeAppText from "../../components/appTexts/HugeAppText";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import SeparatorWithText from "../../components/decorators/SeparatorWithText";
import FormTextInput from "../../components/textInputs/FormTextInput";

import colors from "../../config/colors";
import SmallAppText from "../../components/appTexts/SmallAppText";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "55%",
  },
  formContainer: {
    paddingHorizontal: "10%",
  },
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  hyperlink: {
    alignSelf: "center",
    color: colors.text.tertiary,
    marginBottom: 15,
    marginTop: 5,
  },
  input: {
    marginVertical: 10,
  },
  separator: {
    marginVertical: 40,
  },
});

const checkProfileCompleted = async (navigation, userId, accessToken) => {
  try {
    const response = await fetch(
      global.API_HOST + "/user/check-profile-completed",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          accessToken: accessToken,
        }),
      }
    );
    const json = await response.json();

    if (response.status === 200) {
      if (json.status === "true") {
        navigation.navigate("main", { screen: "profile" });
      } else {
        navigation.navigate("updatePersonalInfo");
      }
    } else {
      showMessage({
        message: json.status,
        type: "danger",
      });
    }
  } catch (error) {
    showMessage({
      message: error.toString(),
      type: "danger",
    });
  }
};

const sendFormToApi = async (navigation, values) => {
  try {
    Keyboard.dismiss();

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(global.API_HOST + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      signal: controller.signal,
    });
    clearTimeout(id);

    const json = await response.json();

    if (response.status === 200) {
      await SecureStore.setItemAsync("userId", json.userId);
      await SecureStore.setItemAsync("accessToken", json.accessToken);
      await SecureStore.setItemAsync("refreshToken", json.refreshToken);

      await checkProfileCompleted(navigation, json.userId, json.accessToken);
    } else if (response.status === 400) {
      showMessage({
        message: json.status,
        type: "warning",
      });
    } else {
      showMessage({
        message: json.status,
        type: "danger",
      });
    }
  } catch (error) {
    showMessage({
      message:
        error.name === "AbortError" ? "Connection timeout" : error.toString(),
      type: "danger",
    });
  }
};

function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HugeAppText style={styles.header}>Sign In</HugeAppText>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => await sendFormToApi(navigation, values)}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <FormTextInput
                autoCapitalize={"none"}
                autoComplete={"email"}
                autoCorrect={false}
                clearButtonMode={"while-editing"}
                field={"email"}
                icon={"ios-mail"}
                keyboardType={"email-address"}
                placeholder={"Email Address"}
                textContentType={"emailAddress"}
                style={styles.input}
              />
              <FormTextInput
                autoCapitalize={"none"}
                autoComplete={"password"}
                autoCorrect={false}
                clearButtonMode={"while-editing"}
                field={"password"}
                icon={"ios-lock-closed"}
                keyboardType={"default"}
                placeholder={"Password"}
                secureTextEntry
                textContentType={"password"}
                style={styles.input}
              />
              <SmallAppText
                onPress={() => navigation.navigate("forgot")}
                style={styles.hyperlink}
              >
                Forgot Password?
              </SmallAppText>
              <PrimaryButton onPress={handleSubmit}>Sign In</PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={styles.separator}>
          Don't Have an Account?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("register")}>
          Create Account
        </SecondaryButton>
        <View style={{ height: 60 }}></View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default SignInScreen;
