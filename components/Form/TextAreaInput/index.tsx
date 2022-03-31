import { BindInput } from "@/libs/hooks/useInput";
import { Form } from "react-bootstrap";
import TextInput from "../TextInput";

type Props = {
  title: string;
  placeholder: string;
  textInput: BindInput;
  validate: (value: string) => { valid: boolean; error: string };
};

export default function TextAreaInput(props: Props) {
  return <TextInput {...props} type="textarea" />;
}
