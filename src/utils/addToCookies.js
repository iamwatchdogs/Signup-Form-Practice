export default function addToCookies(data) {
  Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .forEach((value) => (document.cookie = value));
  alert(`Updated Cookies: ${document.cookie}`);
}
