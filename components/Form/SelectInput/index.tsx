import { BindSelect } from "@/libs/hooks/useSelect";
import { Form } from "react-bootstrap";

type Props = {
  title: string;
  options: string[];
  selectInput: BindSelect;
};

export default function SelectInput({ title, selectInput, options }: Props) {
  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Select aria-label="Default select example" {...selectInput}>
        <option>Choose one</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
