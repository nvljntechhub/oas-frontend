import { useField } from "formik";
import { InputLabel, TextField, useTheme } from "@mui/material";
import "src/css/style.css";

function TextInput(props: any) {
  const {
    name,
    label,
    multiline,
    maxRows,
    InputLabelProps,
    InputProps,
    component,
    sx,
    ...rest
  } = props;
  const [field, meta] = useField(name);
  const configTextfield = {
    ...field,
    ...rest,
    fullWidth: true,
    variant: "outlined",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <>
      <InputLabel className="input-label">{label}</InputLabel>
      <TextField
        {...configTextfield}
        multiline={multiline}
        maxRows={maxRows}
        InputLabelProps={InputLabelProps}
        component={component}
        sx={sx}
        InputProps={InputProps}
      />
    </>
  );
}

export default TextInput;
