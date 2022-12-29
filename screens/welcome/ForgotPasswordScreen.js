import React from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";

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
  background: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: "relative",
    right: 0,
    top: 0,
  },
  container: {
    bottom: "16%",
    height: "55%",
    marginHorizontal: "10%",
  },
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  imageBackground: {
    bottom: "-115%",
    position: "absolute",
    resizeMode: "cover",
    top: 0,
  },
  input: {
    marginVertical: 10,
  },
  juniper: {
    bottom: 0,
    height: 50,
    left: 0,
    position: "absolute",
    resizeMode: "contain",
    right: 0,
    top: "15%",
    width: undefined,
  },
  separator: {
    marginVertical: 40,
  },
  wrapper: {
    flex: 1,
  },
});

const sendFormToApi = async (values) => {
  try {
    Keyboard.dismiss();
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
      }
    );
    const json = await response.json();

    if (response.status === 200) {
      showMessage({
        message: "Successfully requested password reset",
        type: "success",
      });
    } else {
      showMessage({
        message: json.body,
        type: "danger",
      });
    }
    return json;
  } catch (error) {
    showMessage({
      message: error.toString(),
      type: "danger",
    });
  }
};

function ForgotPasswordScreen({ navigation }) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        imageStyle={styles.imageBackground}
        source={require("../../assets/images/backgrounds/wave.png")}
        style={styles.background}
      />
      <Image
        source={require("../../assets/images/whiteText/juniper.png")}
        style={styles.juniper}
      />
      <SafeAreaView style={styles.container}>
        <HugeAppText style={styles.header}>Forgot Password?</HugeAppText>
        <Formik
          initialValues={{ email: "" }}
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
              <View style={{ height: 10 }}></View>
              <PrimaryButton onPress={handleSubmit}>
                Reset Password
              </PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={styles.separator}>
          Already have your password?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("login")}>
          Sign In
        </SecondaryButton>
      </SafeAreaView>
    </View>
  );
}

export default ForgotPasswordScreen;
