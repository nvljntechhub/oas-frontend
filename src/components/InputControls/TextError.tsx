import { colorCodes } from "src/utils/properties";

function TextError(props: any) {
  return (
    <div
      style={{
        color: colorCodes.CRIMSION,
        textAlign: "left",
        fontWeight: "bold",
      }}
    >
      {props.children}
    </div>
  );
}

export default TextError;
