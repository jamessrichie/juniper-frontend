import React from "react";
import {
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
} from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

import PrimaryButton from "../../components/buttons/PrimaryButton";
import HugeAppText from "../../components/appTexts/HugeAppText";
import SeparatorWithText from "../../components/decorators/SeparatorWithText";
import SecondaryButton from "../../components/buttons/SecondaryButton";

import colors from "../../config/colors";
import FormTextInput from "../../components/textInputs/FormTextInput";
import TinyHyperlink from "../../components/hyperlinks/TinyHyperlink";

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
    bottom: "24%",
  },
  hyperlink: {
    alignSelf: "center",
    marginVertical: 5,
  },
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  imageBackground: {
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    bottom: "-80%",
  },
  input: {
    marginVertical: 10,
  },
  juniper: {
    height: 50,
    resizeMode: "contain",
    width: undefined,
    position: "absolute",
    top: "9%",
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
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

function SignInScreen({ navigation }) {
  return (
    <View style={styles.wrapper} behavior="padding">
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
        <HugeAppText style={styles.header}>Create Your Account</HugeAppText>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
          }}
          onSubmit={async (values) => console.log(await sendFormToApi(values))}
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
                autoComplete={"password-new"}
                autoCorrect={false}
                clearButtonMode={"while-editing"}
                field={"password"}
                icon={"ios-lock-closed"}
                keyboardType={"default"}
                placeholder={"Password"}
                secureTextEntry
                textContentType={"password-new"}
                style={styles.input}
              />
              <FormTextInput
                autoCapitalize={"none"}
                autoComplete={"password-new"}
                autoCorrect={false}
                clearButtonMode={"while-editing"}
                field={"passwordConfirmation"}
                icon={"ios-lock-closed"}
                keyboardType={"default"}
                placeholder={"Confirm Password"}
                secureTextEntry
                textContentType={"password-new"}
                style={styles.input}
              />
              <TinyHyperlink
                textColor={colors.text.tertiary}
                linkColor={colors.hyperlink}
                preLinkText={"I have read and agree to the"}
                onPress={() => Linking.openURL("https://google.com")}
                linkText={"Terms & Conditions"}
                style={styles.hyperlink}
              />
              <PrimaryButton onPress={handleSubmit} style={{ marginTop: 10 }}>
                Create Account
              </PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={{ marginVertical: 40 }}>
          Already Have An Account?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("login")}>
          Sign In
        </SecondaryButton>
      </SafeAreaView>
    </View>
  );
}

export default SignInScreen;
