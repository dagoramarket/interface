import React from "react";
import styles from "./TagInput.module.css";

export interface OnChangeFunction {
  (tags: string[]): void;
}


const separationChar = " ";

export type Props = {
  values?: string[];
  onChange: OnChangeFunction;
};

export default function TagsInput({ values, onChange }: Props) {
  const [tagData, setTagData] = React.useState(values ?? []);
  const removeTagData = (indexToRemove: number) => {
    const tags = [...tagData.filter((_, index) => index !== indexToRemove)];
    setTagData(tags);
    onChange(tags);
  };
  const addTagData = (tag: string) => {
    if (tag !== "") {
      const tags = [...tagData, tag];
      setTagData(tags);
      tag = "";
      onChange(tags);
    }
  };
  return (
    <div className={styles.tagInput}>
      <ul className={styles.tags}>
        {tagData.map((tag, index) => (
          <li key={index} className={styles.tag}>
            <span className={styles.tagTitle}>{tag}</span>
            <span
              className={styles.tagCloseIcon}
              onClick={() => removeTagData(index)}
            >
              ✖
            </span>
          </li>
        ))}
      </ul>
      <input
        className={styles.inputField}
        type="text"
        onKeyUp={(event) => {
          event.preventDefault();
          const target = event.target as HTMLInputElement;
          if (event.key === separationChar) {
            addTagData(target.value);
            target.value = "";
          }
        }}
        onKeyDown={(event) => {
          if (event.key === separationChar) {
            event.preventDefault();
          }
        }}
      />
    </div>
  );
}
