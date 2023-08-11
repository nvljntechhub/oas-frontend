import SearchInput from "./SearchControl";
import Textarea from "./Textarea";
import TextInput from "./TextInput";

function FormikControl(props: any) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <TextInput {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "search":
      return <SearchInput {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
