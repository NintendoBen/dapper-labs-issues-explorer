import React, { useCallback, useEffect, useState } from "react";
import { normalizeData } from "../../core/normalizeData";
import { load, save } from "../../core/storage";
import ResultsPage from "../ResultsPage";
import SearchPage from "../SearchPage";
import styles from "./Application.css";

sessionStorage.clear();

const filters = [
  { id: "all", label: "All Issues" },
  { id: "open", label: "Open Issues" },
  { id: "closed", label: "Closed Issues" },
  { id: "pull", label: "Pull Requests" },
];

const sessionCache = load();

const defaultData = {
  entities: {
    issues: {},
    labels: {},
    users: {},
  },
};

function mergeData(data1, data2) {
  return {
    entities: {
      issues: { ...data1.entities.issues, ...data2.entities.issues },
      labels: { ...data1.entities.labels, ...data2.entities.labels },
      users: { ...data1.entities.users, ...data2.entities.users },
    },
  };
}

export function Application(props) {
  const [search, setSearch] = useState([""]);
  const [searched, setSearched] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [data, setData] = useState(defaultData);
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState(filters[0]);

  const LOADING_MESSAGE = "Loading...";
  const BLANK_MESSAGE = "";
  const GITHUB_ERROR_MESSAGE = "There was a problem loading this GitHub URL";

  useEffect(() => {
    const searchURL = search[0];

    if (!searchURL) return;

    const url = `${searchURL}?state=${filter.id}`;

    if (sessionCache[url]) {
      const mergedData = mergeData(data, sessionCache[url]);

      setSearchMessage(BLANK_MESSAGE);
      setSearched(true);
      setData(mergedData);
      setIssues(sessionCache[url].result);
      return;
    }

    setSearchMessage(LOADING_MESSAGE);

    fetch(url)
      .then((response) => {
        if (response.status !== 200) {
          setSearchMessage(GITHUB_ERROR_MESSAGE);
          throw new Error(GITHUB_ERROR_MESSAGE);
        }
        return response.json();
      })
      .then((json) => {
        const normalizedData = normalizeData(json);

        sessionCache[url] = normalizedData;
        save(sessionCache);

        const mergedData = mergeData(data, normalizedData);

        setSearchMessage(BLANK_MESSAGE);
        setSearched(true);
        setData(mergedData);
        setIssues(normalizedData.result);
      });
  }, [filter, search]);

  const onResultsClose = useCallback(() => {
    setSearched(false);
  });

  return (
    <div className={searched ? styles.results : styles.search}>
      <SearchPage
        message={searchMessage}
        onSearch={setSearch}
        onError={setSearchMessage}
        mode={searched ? "small" : "large"}
      />
      <ResultsPage
        data={data}
        issues={issues}
        filter={filter}
        filters={filters}
        onClose={onResultsClose}
        onFilter={setFilter}
      />
    </div>
  );
}

export default Application;
