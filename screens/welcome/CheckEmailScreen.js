import React from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import HugeAppText from "../../components/appTexts/HugeAppText";
import MediumAppText from "../../components/appTexts/MediumAppText";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import SeparatorWithText from "../../components/decorators/SeparatorWithText";

import colors from "../../config/colors";

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
    marginTop: 22,
    textAlign: "center",
  },
  body: {
    color: colors.text.secondary,
    textAlign: "center",
    marginVertical: 32,
  },
  separator: {
    marginVertical: 40,
  },
});

const resendEmail = async (email) => {
  try {
    Keyboard.dismiss();
    const response = await fetch(global.API_HOST + "/services/resend-email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const json = await response.json();

    if (response.status === 200) {
      showMessage({
        message: "Successfully sent email",
        type: "success",
      });
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
      message: error.toString(),
      type: "danger",
    });
  }
};

function CheckEmailScreen({ navigation, route }) {
  const { email } = route.params;

  return (
    <View style={styles.container}>
      <HugeAppText style={styles.header}>Check Your Email</HugeAppText>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <MediumAppText style={styles.body}>
          We've just sent you an email at{" "}
          <Text style={{ color: colors.hyperlink }}>{email}</Text>! Please check
          it out as soon as possible.
        </MediumAppText>
        <PrimaryButton onPress={async () => await resendEmail(email)}>
          Resend Email
        </PrimaryButton>
        <SeparatorWithText style={styles.separator}>
          Ready to Sign Into Your Account?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("login")}>
          Sign In
        </SecondaryButton>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default CheckEmailScreen;
