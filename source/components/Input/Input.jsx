import React, { useCallback, useState } from "react";
import styles from "./Input.css";

const defaultValue = "";

function Input(props) {
  const [value, setValue] = useState(
    props.defaultValue ? props.defaultValue : defaultValue
  );

  const onChange = useCallback((event) => {
    const value = event.target.value;

    setValue(value);

    if (props.onChange) props.onChange(value);
  });

  const onKeyDown = useCallback(
    (event) => {
      if (props.onEnter && event.key === "Enter") props.onEnter(value);
    },
    [value]
  );

  const Icon = props.icon;

  return (
    <div className={styles.container}>
      <Icon className={props.invalid ? styles.iconInvalid : styles.icon} />
      <input
        className={props.invalid ? styles.inputInvalid : styles.input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={props.placeholder}
        spellCheck="false"
        type="url"
        value={value}
      />
    </div>
  );
}

export default Input;
