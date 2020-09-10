import React, { useEffect, useRef, useState } from "react";
import { animated, config, useTransition } from "react-spring";
import Filter from "../Filter";
import Grid from "../Grid";
import Issue from "../Issue";
import styles from "./ResultsPage.css";
import CloseIcon from "../../assets/icons/close.svg";

const xSpacing = 320 + 48;
const ySpacing = 177 + 48;

function calculateColumns() {
  let columns = Math.floor((window.innerWidth - 96) / xSpacing);
  if (columns < 1) columns = 1;

  return columns;
}

function calculateExtraSpace(columns) {
  return columns === 1
    ? 0
    : (window.innerWidth - 48 - columns * xSpacing) / columns;
}

const defaultColumns = calculateColumns();
const defaultExtraSpace = calculateExtraSpace(defaultColumns);

export function ResultsPage(props) {
  const [columns, setColumns] = useState(defaultColumns);
  const [extraSpace, setExtraSpace] = useState(defaultExtraSpace);
  const resizeTimeout = useRef();

  useEffect(() => {
    function onResize() {
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

      resizeTimeout.current = setTimeout(() => {
        const columns = calculateColumns();
        const extraSpace = calculateExtraSpace(columns);

        setColumns(columns);
        setExtraSpace(extraSpace);
      }, 500);
    }

    window.addEventListener("resize", onResize);
  }, []);

  const items = props.issues.map((item, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);

    let x = column * xSpacing;
    let y = row * ySpacing;

    if (column > 0) x += extraSpace * column;

    return {
      id: item,
      xy: [x, y],
    };
  });

  const transitions = useTransition(items, (item) => item.id, {
    from: ({ xy }) => ({ xy, opacity: 0 }),
    enter: ({ xy }) => async (next, cancel) => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      await next({ xy, opacity: 1 });
    },
    update: ({ xy }) => ({ xy }),
    leave: ({ xy }) => ({ xy: [xy[0], xy[1] + 100], opacity: 0 }),
    config: config.default,
  });

  return (
    <div className={styles.resultsPage}>
      <Grid>
        <Filter
          values={props.filters}
          selected={props.filter}
          onFilter={props.onFilter}
        />
        {transitions.map(({ item, key, props: { xy, ...rest } }, index) => {
          return (
            <animated.div
              key={key}
              style={{
                transform: xy.interpolate(
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                ),
                ...rest,
              }}
            >
              <Issue id={item.id} data={props.data} x={xy[0]} y={xy[1]} />
            </animated.div>
          );
        })}
        {/* Used to fill the height of the list of items that are position: absolute */}
        <div
          style={{
            height: props.issues
              ? Math.floor(props.issues.length / columns) * ySpacing + ySpacing
              : 0,
          }}
        ></div>
      </Grid>
      <CloseIcon className={styles.close} onClick={props.onClose} />
    </div>
  );
}

export default ResultsPage;
