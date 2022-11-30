import React from "react";
import {
  View,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Keyboard,
} from "react-native";

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
import TinyHyperlink from "../../components/hyperlinks/TinyHyperlink";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(4).required().label("Password"),
});

const styles = StyleSheet.create({
  background: {
    position: "relative",
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    marginHorizontal: "10%",
    height: "55%",
    bottom: "16%",
  },
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  hyperlink: {
    color: colors.text.tertiary,
    marginVertical: 5,
    alignSelf: "center",
  },
  imageBackground: {
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    bottom: "-115%",
  },
  input: {
    marginVertical: 10,
  },
  juniper: {
    height: 50,
    resizeMode: "contain",
    width: undefined,
    position: "absolute",
    top: "15%",
    left: 0,
    right: 0,
    bottom: 0,
  },
  wrapper: {
    flex: 1,
  },
});

const sendFormToApi = async (values) => {
  try {
    Keyboard.dismiss();
    const response = await fetch(global.API_HOST + "/auth/verify-credentials", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

function SignInScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("../../assets/images/backgrounds/wave.png")}
        style={styles.background}
        imageStyle={styles.imageBackground}
      />
      <Image
        source={require("../../assets/images/whiteText/juniper.png")}
        style={styles.juniper}
      />
      <SafeAreaView style={styles.container}>
        <HugeAppText style={styles.header}>Sign In</HugeAppText>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => console.log(await sendFormToApi(values))}
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
              <TinyHyperlink
                linkColor={colors.text.tertiary}
                onPress={() => navigation.navigate("forgot")}
                linkText={"Forgot Password?"}
                style={styles.hyperlink}
              />
              <PrimaryButton onPress={handleSubmit} style={{ marginTop: 10 }}>
                Sign In
              </PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={{ marginVertical: 40 }}>
          Don't Have an Account?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("register")}>
          Create Account
        </SecondaryButton>
      </SafeAreaView>
    </View>
  );
}

export default SignInScreen;
