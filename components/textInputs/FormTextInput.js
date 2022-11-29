import React from "react";
import AppTextInput from "./AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

import { useFormikContext } from "formik";

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
