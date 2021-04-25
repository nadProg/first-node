export default function ({ protocol, hostname }, port, path) {
  return `${protocol}://${hostname}:${port}${path}`;
}
