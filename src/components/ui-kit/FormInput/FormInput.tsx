
import React, { useMemo } from "react";
import { FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@mui/material';

export const FormInput = ({field, meta, label, variant = 'outlined', id}: FieldProps & TextFieldProps) => {
  const errorText = useMemo(
    () => (meta.touched && meta.error) ? meta.error : '',
    [meta.touched, meta.error]
  );

  return (<TextField
    label={label}
    variant={variant}
    id={id}
    error={Boolean(meta.touched && meta.error)}
    helperText={errorText}
    {...field}
    />)
}