import io, { Socket } from 'socket.io-client';

const getApiUrl = (): string => {
  const url: string = process.env.REACT_APP_BASE_API_URL ?? 'http://localhost:3000/api';
  return url;
};

const getSocket = (): Socket => {
  const url: string = process.env.REACT_APP_SOCKET_URL ?? 'http://localhost:3003';
  const socket = io(url);
  return socket;
}
const socket = getSocket();
export { getApiUrl, socket };
