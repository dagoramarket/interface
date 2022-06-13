import { ChangeEvent } from "react";
import { FieldError } from "react-hook-form";
import TextInput from "../TextInput";

type Props = {
  title: string;
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: FieldError;
};

export default function TextAreaInput(props: Props) {
  return <TextInput {...props} type="textarea" />;
}
