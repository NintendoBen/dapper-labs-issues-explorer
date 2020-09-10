import React, { useCallback, useState } from "react";
import styles from "./Filter.css";

function Item({ children, filter, onClick, selected, ...props }) {
  const click = useCallback(() => {
    if (onClick) onClick(filter);
  }, [filter, onClick]);

  return (
    <div
      className={selected ? styles.itemSelected : styles.item}
      onClick={click}
      {...props}
    >
      {children}
    </div>
  );
}

function Filter(props) {
  const onClick = useCallback((id) => {
    if (props.onFilter) props.onFilter(id);
  });

  return (
    <div className={styles.filter}>
      {props.values.map((filter) => (
        <Item
          key={filter.id}
          filter={filter}
          selected={props.selected === filter}
          onClick={onClick}
        >
          {filter.label}
        </Item>
      ))}
    </div>
  );
}

export default Filter;
