import { BindSelect } from "@/libs/hooks/useSelect";
import { ChangeEvent, useState } from "react";
import { Form } from "react-bootstrap";

type Props = {
  title: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void;
};

export default function SelectInput({
  title,
  value,
  onChange,
  onBlur,
  options,
  error,
}: Props) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Select
        aria-label="Default select example"
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        isInvalid={error !== undefined}
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
