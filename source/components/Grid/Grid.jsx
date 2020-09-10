import React from "react";
import styles from "./Grid.css";

export function Grid({ children, ...props }) {
  return (
    <div className={styles.grid} {...props}>
      {children}
    </div>
  );
}

export default Grid;
