import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';


type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl style={{paddingTop: '20px'}}  error={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        color="primary"
        placeholder={props.placeholder}
      />
      {
        error ? <Alert severity="error">{error}</Alert> : null
      }
    </FormControl>
  );
};
