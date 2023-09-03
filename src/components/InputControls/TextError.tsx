import { colorCodes } from 'src/utils/properties';

function TextError(props: any) {
  return (
    <div
      style={{
        color: colorCodes.ERROR,
        fontSize: '12px'
      }}
    >
      {props.children}
    </div>
  );
}

export default TextError;
