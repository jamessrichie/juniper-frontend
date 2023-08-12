import React from "react";
import { Keyboard, Linking, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  name: Yup.string().required().label("Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(4).required().label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
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

const sendFormToApi = async (navigation, values) => {
  try {
    Keyboard.dismiss();

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(global.API_HOST + "/user/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
      signal: controller.signal,
    });
    clearTimeout(id);

    const json = await response.json();

    if (response.status === 200) {
      navigation.navigate("checkEmail", { email: values.email });
    } else {
      showMessage({
        message: json.status,
        type: "danger",
      });
    }
    return json;
  } catch (error) {
    showMessage({
      message:
        error.name === "AbortError" ? "Connection timeout" : error.toString(),
      type: "danger",
    });
  }
};

function RegistrationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HugeAppText style={styles.header}>Create Your Account</HugeAppText>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          onSubmit={async (values) => await sendFormToApi(navigation, values)}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => (
            <>
              <FormTextInput
                autoCapitalize={"none"}
                autoComplete={"name"}
                autoCorrect={false}
                clearButtonMode={"while-editing"}
                field={"name"}
                icon={"person"}
                keyboardType={"default"}
                placeholder={"Full Name"}
                textContentType={"name"}
                style={styles.input}
              />
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
              <FormTextInput
                autoCapitalize={"none"}
                autoComplete={"password"}
                autoCorrect={false}
                clearButtonMode={"while-editing"}
                field={"passwordConfirmation"}
                icon={"ios-lock-closed"}
                keyboardType={"default"}
                placeholder={"Confirm Password"}
                secureTextEntry
                textContentType={"password"}
                style={styles.input}
              />
              <SmallAppText style={styles.hyperlink}>
                I have read and agree to the{" "}
                <SmallAppText
                  onPress={() => Linking.openURL("https://google.com")}
                  style={{ color: colors.hyperlink }}
                >
                  Terms & Conditions
                </SmallAppText>
              </SmallAppText>
              <PrimaryButton onPress={handleSubmit}>
                Create Account
              </PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={styles.separator}>
          Already Have an Account?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("login")}>
          Sign In
        </SecondaryButton>
        <View style={{ height: 60 }}></View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default RegistrationScreen;
