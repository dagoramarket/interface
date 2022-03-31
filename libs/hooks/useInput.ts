import { useState } from "react";

export type BindInput = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: (value: string) => void;
};

export function useInput(initialValue: string): BindInput {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return { value, onChange, setValue };
}
