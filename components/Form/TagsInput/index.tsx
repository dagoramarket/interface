import { Form } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";

type Props = {
  title: string;
  values: string[];
  setValues: (tags: string[]) => void;
};

export default function TagsInput({ title, values, setValues }: Props) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <InputTags values={values} onTags={(value) => setValues(value.values)} />
    </Form.Group>
  );
}
