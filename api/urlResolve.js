import { API_PATH } from './path.js';
import { PORT } from '../port.js';

export default function ({ protocol, hostname }) {
  return `${protocol}://${hostname}:${PORT}${API_PATH}`;
}
