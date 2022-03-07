import {SocketEnd} from './socketConfig';

describe('SocketEnd', () => {
  test('createConnection should connect to socket with valid url', () => {
    const url = 'invalid_url';
    const createConnection = () => {
      SocketEnd.createConnection(url);
    }
    expect(createConnection).toThrow(new Error(`The URL '${url}' is invalid.`));
  });
  test('createConnection should connect to socket with valid url', () => {
    const socket = SocketEnd.createConnection();
    expect(socket).toBe(SocketEnd.socket);
  });
  test('createConnection should return socket instance if it exist', () => {
    const socket = SocketEnd.createConnection();
    expect(socket).toBe(SocketEnd.socket);
  });
});
