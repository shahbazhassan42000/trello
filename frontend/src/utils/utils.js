const protocol = process.env.REACT_APP_HTTPS === 'true' ? 'https' : 'http';
const host = process.env.REACT_APP_BACKEND_HOST;
const port = process.env.REACT_APP_BACKEND_PORT;
export const SERVER_URL = process.env.NODE_ENV === 'production'
  ? `${host}`
  : `${protocol}://${host}:${port}`;
export const API_URL = `${ SERVER_URL }/api`;