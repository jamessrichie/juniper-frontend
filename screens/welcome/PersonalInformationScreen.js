import React, { useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "@react-native-community/datetimepicker";

import * as ImagePicker from "expo-image-picker";
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
import defaultStyles from "../../config/styles";

import PrimaryIconButton from "../../components/buttons/PrimaryIconButton";
import HugeCircularImage from "../../components/images/HugeCircularImage";
import TinyPrimaryIconButton from "../../components/buttons/TinyPrimaryIconButton";
import SmallAppText from "../../components/appTexts/SmallAppText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "55%",
  },
  profilePicture: {
    container: {
      alignSelf: "center",
    },
    button: {
      position: "absolute",
      marginLeft: 62,
    },
    text: {
      alignSelf: "center",
      color: colors.text.tertiary,
      marginTop: 12,
      marginBottom: 12,
    },
  },
  dateOfBirth: {
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    pressable: {
      flexGrow: 1,
    },
    input: {
      marginVertical: 10,
      marginRight: 10,
    },
  },
  formContainer: {
    paddingHorizontal: "10%",
  },
  header: {
    color: colors.text.secondary,
    marginVertical: 22,
    textAlign: "center",
  },
  separator: {
    marginVertical: 40,
  },
});

const sendProfilePictureToApi = async (image) => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    await fetch(global.API_HOST + "/user/update-profile-pic", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: await SecureStore.getItemAsync("userId"),
        accessToken: await SecureStore.getItemAsync("accessToken"),
        profilePicture: image.uri,
      }),
      signal: controller.signal,
    });
    clearTimeout(id);
  } catch (error) {
    showMessage({
      message:
        error.name === "AbortError" ? "Connection timeout" : error.toString(),
      type: "danger",
    });
  }
};

const sendFormToApi = async (navigation, values, date) => {
  try {
    if (!date) {
      navigation.navigate("checkEmail", { email: values.email });
      return;
    }
    Keyboard.dismiss();

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(
      global.API_HOST + "/user/update-date-of-birth",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: await SecureStore.getItemAsync("userId"),
          accessToken: await SecureStore.getItemAsync("accessToken"),
          dateOfBirth: date,
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

function PersonalInformationScreen({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(date.getDate());
  const [displayedDate, setDisplayedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [image, setImage] = useState(
    require("../../assets/images/defaults/profile_picture.png")
  );

  const onDatePickerChange = (event, selectedDate) => {
    if (day !== selectedDate.getDate()) {
      setDay(selectedDate.getDate());
      setShowDatePicker(false);
    }
    setDate(selectedDate);
    setDisplayedDate(selectedDate.toLocaleDateString());
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    setImage({ uri: "data:image/jpeg;base64," + result.assets[0].base64 });
    await sendProfilePictureToApi(image);
  };

  return (
    <View style={styles.container}>
      <HugeAppText style={styles.header}>
        Let’s Personalize Your {"\n"} Account
      </HugeAppText>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        style={styles.formContainer}
      >
        <Formik
          initialValues={{ dateOfBirth: "" }}
          onSubmit={async (values) =>
            await sendFormToApi(navigation, values, displayedDate)
          }
        >
          {({ handleSubmit }) => (
            <>
              <Pressable onPress={async () => await imagePicker()}>
                <View
                  pointerEvents={"none"}
                  style={styles.profilePicture.container}
                >
                  <HugeCircularImage source={image} />
                  <TinyPrimaryIconButton
                    icon={"add"}
                    style={styles.profilePicture.button}
                  />
                </View>
                <SmallAppText style={styles.profilePicture.text}>
                  Add a Profile Picture
                </SmallAppText>
              </Pressable>

              <View style={styles.dateOfBirth.container}>
                <Pressable
                  style={styles.dateOfBirth.pressable}
                  onPress={toggleDatePicker}
                >
                  <View pointerEvents={"none"}>
                    <FormTextInput
                      autoCapitalize={"none"}
                      autoComplete={"email"}
                      autoCorrect={false}
                      clearButtonMode={"while-editing"}
                      field={"dateOfBirth"}
                      icon={"calendar"}
                      keyboardType={"email-address"}
                      placeholder={"Date of Birth"}
                      textContentType={"emailAddress"}
                      value={displayedDate}
                      style={styles.dateOfBirth.input}
                      editable={false}
                    />
                  </View>
                </Pressable>
                <PrimaryIconButton
                  icon={"ios-pencil-sharp"}
                  onPress={toggleDatePicker}
                />
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onDatePickerChange}
                  display={"inline"}
                />
              )}
              <View style={{ height: 10 }}></View>
              <PrimaryButton onPress={handleSubmit}>Next</PrimaryButton>
            </>
          )}
        </Formik>
        <SeparatorWithText style={styles.separator}>
          Feel Like Doing This Later?
        </SeparatorWithText>
        <SecondaryButton onPress={() => navigation.navigate("login")}>
          Skip
        </SecondaryButton>
        <View style={{ height: 60 }}></View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default PersonalInformationScreen;
