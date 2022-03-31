import { BindInput } from "@/libs/hooks/useInput";
import { Form } from "react-bootstrap";

type Props = {
    title: string,
    placeholder: string,
    textInput: BindInput;
};

export default function TextAreaInput({ title, placeholder, textInput }: Props) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="textarea"
        isInvalid={false}
        isValid={false}
        placeholder={placeholder}
        {...textInput}
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      <Form.Control.Feedback type="invalid">
        Thats an error
      </Form.Control.Feedback>
    </Form.Group>
  );
}
