import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
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

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
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
    const response = await fetch(
      global.API_HOST + "/auth/request-reset-password",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
        }),
        signal: controller.signal,
      }
    );
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

function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <HugeAppText style={styles.header}>Forgot Password?</HugeAppText>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <Formik
          initialValues={{ email: "" }}
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
              <View style={{ height: 10 }}></View>
              <PrimaryButton onPress={handleSubmit}>
                Reset Password
              </PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={styles.separator}>
          Already Have Your Password?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("login")}>
          Sign In
        </SecondaryButton>
        <View style={{ height: 60 }}></View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default ForgotPasswordScreen;
