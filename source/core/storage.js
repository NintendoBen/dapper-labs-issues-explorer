export function load() {
  const cache = sessionStorage.getItem("issues")
    ? JSON.parse(sessionStorage.getItem("issues"))
    : {};

  return cache;
}

export function save(cache) {
  sessionStorage.setItem("issues", JSON.stringify(cache));
}
