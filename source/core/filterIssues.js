export function filterIssues(data, filter) {
  if (filter.id === "all") return data.result;

  return data.result.filter((issueID) => {
    return data.entities.issues[issueID].state === filter.id;
  });
}
