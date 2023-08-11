import { ErrorMessage, useField } from "formik";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import TextError from "./TextError";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  option: string,
  optionName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      optionName.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props: any) {
  const {
    label,
    name,
    width = "100%",
    options,
    onChange,
    formik,
    ...rest
  } = props;
  const [field, meta] = useField(name);
  const theme = useTheme();
  const configTextfield = {
    ...field,
    ...rest,
    name,
    label,
    options,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="multiple-chip-label">{label}</InputLabel>
      <Select
        labelId="multiple-chip-label"
        id="multiple-chip"
        name={name}
        onChange={onChange}
        multiple
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected: any) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => {
              return (
                <Chip
                  key={value}
                  label={
                    options.find((option: any) => option.value === value).label
                  }
                  sx={{ zIndex: 35001 }}
                />
              );
            })}
          </Box>
        )}
        MenuProps={MenuProps}
        {...configTextfield}
      >
        {options.map((option: any) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ ml: 1 }}>
        <ErrorMessage name={name} component={TextError} />
      </Box>
    </FormControl>
  );
}
