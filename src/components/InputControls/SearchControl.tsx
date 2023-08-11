import { useField } from "formik";
import { InputLabel, TextField } from "@mui/material";

function SearchInput(props: any) {
  const {
    name,
    width = "100%",
    label,
    InputProps,
    sx,
    disabled,
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
        InputProps={InputProps}
        sx={sx}
        disabled={disabled}
      />
    </>
  );
}

export default SearchInput;
