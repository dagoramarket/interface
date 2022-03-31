import { BindSelect } from "@/libs/hooks/useSelect";
import { useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  title: string;
  options: string[];
  selectInput: BindSelect;
  validate: (value: string) => { valid: boolean; error: string };
};

enum ValidationState {
  Valid,
  Invalid,
  Pending,
}

export default function SelectInput({
  title,
  selectInput,
  options,
  validate,
}: Props) {
  const [state, setState] = useState(ValidationState.Pending);
  const [error, setError] = useState("");

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Select
        aria-label="Default select example"
        {...selectInput}
        isInvalid={state == ValidationState.Invalid}
        isValid={state == ValidationState.Valid}
        onBlur={() => {
          const { valid, error } = validate(selectInput.value);
          setState(valid ? ValidationState.Valid : ValidationState.Invalid);
          setError(error);
        }}
      >
        <option value="">Choose one</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}
