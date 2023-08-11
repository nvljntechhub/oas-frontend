import { ErrorMessage, Field } from "formik";
import React from "react";
import TextError from "./TextError";
import { useField } from "formik";

function Textarea(props: any) {
  const [field, meta] = useField(props);
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name} className="common-label">
        {label}
      </label>
      <Field
        as="textarea"
        id={name}
        name={name}
        className={meta.touched && meta.error ? "red-border" : "normal-border"}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Textarea;
