import { BindInput } from "@/libs/hooks/useInput";
import { useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  title: string;
  placeholder: string;
  textInput: BindInput;
  validate: (value: string) => { valid: boolean; error: string };
  type?: undefined | "textarea";
};

enum ValidationState {
  Valid,
  Invalid,
  Pending
}

export default function TextInput({
  title,
  placeholder,
  textInput,
  validate,
  type
}: Props) {
  const [state, setState] = useState(ValidationState.Pending);
  const [error, setError] = useState("");

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as={type}
        isInvalid={state == ValidationState.Invalid}
        isValid={state == ValidationState.Valid}
        placeholder={placeholder}
        onBlur={() => {
          const { valid, error } = validate(textInput.value);
          setState(valid ? ValidationState.Valid : ValidationState.Invalid);
          setError(error);
        }}
        {...textInput}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
