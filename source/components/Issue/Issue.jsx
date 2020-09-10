import React, { useCallback, useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import styles from "./Issue.css";
import IssueClosedIcon from "../../assets/icons/issue-closed.svg";
import PullRequestIcon from "../../assets/icons/pull-request.svg";

const NO_DESCRIPTION_PROVIDED_TEXT = "No description provided.";

export function Issue(props) {
  const [{ xy }, setSpring] = useSpring(() => ({ xy: [props.x, props.y] }));
  const [data, setData] = useState({});

  useEffect(() => {
    setSpring({
      xy: [props.x, props.y],
    });
  }, [props.x, props.y]);

  useEffect(() => {
    const issue = props.data.entities.issues[props.id];
    const body = issue.body || NO_DESCRIPTION_PROVIDED_TEXT;

    setData({
      body: body,
      labels: issue.labels,
      state: issue.state,
      title: issue.title,
    });
  }, [props.id]);

  let Icon;
  switch (data.state) {
    case "closed":
      Icon = IssueClosedIcon;
      break;
    case "pull":
      Icon = PullRequestIcon;
    default:
      Icon = null;
  }

  return (
    <animated.div
      className={styles.issue}
      // style={{
      //   transform: xy.interpolate((x, y) => `translate(${x}px,${y}px)`),
      // }}
    >
      {Icon && <Icon className={styles.icon} />}
      <div className={styles.titleContainer}>
        <div className={styles.title}>{data.title}</div>
      </div>
      <div className={data.body ? styles.body : styles.noBody}>{data.body}</div>
      {data.labels && (
        <div className={styles.labels}>
          {data.labels?.map((labelID) => {
            const label = props.data.entities.labels[labelID];

            return (
              <div
                key={labelID}
                className={styles.label}
                // style={{ backgroundColor: `#${label.color}` }}
              >
                {label.name}
              </div>
            );
          })}
        </div>
      )}
    </animated.div>
  );
}

export default Issue;
