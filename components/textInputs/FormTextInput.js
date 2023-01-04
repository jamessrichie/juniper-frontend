import React from "react";
import { StyleSheet, View } from "react-native";

import { useFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import AppTextInput from "./AppTextInput";

function FormTextInput({ field, style, ...otherProps }) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
  });

  return (
    <View style={styles.container}>
      <AppTextInput
        onBlur={() => setFieldTouched(field)}
        onChangeText={handleChange(field)}
        style={style}
        {...otherProps}
      />
      <AppErrorMessage error={errors[field]} visible={touched[field]} />
    </View>
  );
}

export default FormTextInput;
