import React from "react";

import { SafeAreaView, StyleSheet } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import PrimaryButton from "../../components/buttons/PrimaryButton";
import HugeAppText from "../../components/appTexts/HugeAppText";
import SmallAppText from "../../components/appTexts/SmallAppText";
import SeparatorWithText from "../../components/decorators/SeparatorWithText";
import SecondaryButton from "../../components/buttons/SecondaryButton";

import colors from "../../config/colors";
import FormTextInput from "../../components/textInputs/FormTextInput";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().password().required().label("Password"),
});

const styles = StyleSheet.create({
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  input: {
    marginVertical: 10,
  },
});

function SignInScreen() {
  return (
    <SafeAreaView style={{ marginHorizontal: "10%" }}>
      <HugeAppText style={styles.header}>Sign In</HugeAppText>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
              style={{
                color: colors.text.tertiary,
                marginVertical: 5,
                textAlign: "center",
              }}
            >
              Forgot Password?
            </SmallAppText>
            <PrimaryButton
              onPress={handleSubmit}
              style={{ marginVertical: 10 }}
            >
              Sign In
            </PrimaryButton>
          </>
        )}
      </Formik>
      <SeparatorWithText style={{ marginVertical: 40 }}>
        Don't Have an Account?
      </SeparatorWithText>
      <SecondaryButton>Create Account</SecondaryButton>
    </SafeAreaView>
  );
}

export default SignInScreen;
