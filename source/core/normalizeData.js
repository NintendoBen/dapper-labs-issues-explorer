import { normalize, schema } from "normalizr";

const user = new schema.Entity("users");
const label = new schema.Entity("labels");
const issue = new schema.Entity("issues", {
  user,
  assignee: user,
  assignees: [user],
  labels: [label],
});

export function normalizeData(data) {
  return normalize(data, [issue]);
}
