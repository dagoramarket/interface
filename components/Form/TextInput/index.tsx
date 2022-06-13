import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { FieldError } from "react-hook-form";

type Props = {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: FieldError;
  type?: undefined | "textarea";
};

enum ValidationState {
  Valid,
  Invalid,
  Pending,
}

export default function TextInput({
  title,
  placeholder,
  onBlur,
  onChange,
  error,
  type,
}: Props) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as={type}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        isInvalid={error?.message !== undefined}
      />
      <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
    </Form.Group>
  );
}
