import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

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
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  input: {
    marginVertical: 10,
  },
});

function ForgotPasswordScreen() {
  return (
    <SafeAreaView style={{ marginHorizontal: "10%" }}>
      <HugeAppText style={styles.header}>Forgot Password?</HugeAppText>
      <Formik
        initialValues={{ email: "" }}
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
            <PrimaryButton
              onPress={handleSubmit}
              style={{ marginVertical: 10 }}
            >
              Reset Password
            </PrimaryButton>
          </>
        )}
      </Formik>
      <SeparatorWithText style={{ marginVertical: 40 }}>
        Already have your password?
      </SeparatorWithText>
      <SecondaryButton>Sign In</SecondaryButton>
    </SafeAreaView>
  );
}

export default ForgotPasswordScreen;
