import React, { useCallback, useRef, useState } from "react";
import { animated, useTransition } from "react-spring";
import { getGitHubIssuesAPIURL } from "../../core/gitHubURLTools";
import Input from "../Input";
import styles from "./SearchPage.css";
import searchIcon from "../../assets/icons/search.svg";

const INVALID_GITHUB_URL = "Invalid GitHub URL";

export function SearchPage(props) {
  const [invalidSearch, setInvalidSearch] = useState(false);
  const timeoutRef = useRef();

  const onSearch = useCallback((value) => {
    const gitHubIssuesURL = getGitHubIssuesAPIURL(value);
    if (!gitHubIssuesURL) {
      setInvalidSearch(true);
      props.onError(INVALID_GITHUB_URL);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setInvalidSearch(false);
      props.onSearch([gitHubIssuesURL]);
    }, 500);
  });

  const small = props.mode === "small";

  const transitions = useTransition(props.message, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className={styles.search}>
      <h1 className={small ? styles.headerSmall : styles.header}>
        GitHub Issue Viewer
      </h1>
      <div className={small ? styles.inputSmall : styles.input}>
        <Input
          // defaultValue="https://github.com/pixijs/pixi.js"
          icon={searchIcon}
          invalid={invalidSearch}
          placeholder="Paste a link to a GitHub repo!"
          onChange={onSearch}
          onEnter={onSearch}
        />
      </div>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} className={styles.info} style={props}>
              {item}
            </animated.div>
          )
      )}
    </div>
  );
}

export default SearchPage;
