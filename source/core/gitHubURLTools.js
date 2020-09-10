// https://github.com/pixijs/pixi.js
const gitHubRegEx = /[^.]+:\/\/github\.com\/([^/]+)\/([^/]+)/i;

export function getGitHubURLComponents(gitHubURL) {
  // [0:gitHubURL]
  // https://github.com/[1:pixijs]/[2:pixi.js]
  return gitHubRegEx.exec(gitHubURL);
}

export function getGitHubIssuesAPIURL(gitHubURL) {
  const gitHubURLComponents = getGitHubURLComponents(gitHubURL);

  if (!gitHubURLComponents) return;

  // https://api.github.com/repos/pixijs/pixi.js/issues
  return `https://api.github.com/repos/${gitHubURLComponents[1]}/${gitHubURLComponents[2]}/issues`;
}
