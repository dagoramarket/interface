import { useState } from "react";

export type BindSelect = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  setValue: (value: string) => void;
};

export function useSelect(initialValue: string): BindSelect {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return { value, onChange , setValue };
}
