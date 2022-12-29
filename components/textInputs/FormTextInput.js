import React from "react";

import { useFormikContext } from "formik";

import AppTextInput from "./AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

function FormTextInput({ field, style, ...otherProps }) {
  const { errors, handleChange, setFieldTouched, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(field)}
        onChangeText={handleChange(field)}
        style={style}
        {...otherProps}
      />
      <AppErrorMessage error={errors[field]} visible={touched[field]} />
    </>
  );
}

export default FormTextInput;
