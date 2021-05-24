import { API_PATH } from './path.js';

export default function ({ protocol, hostname }) {
  const result = `${protocol}://${hostname}${API_PATH}`;
  return result;
}
