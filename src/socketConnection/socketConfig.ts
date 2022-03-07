export const WSS = 'wss://hometask.eg1236.com/game1/';

type Socket = WebSocket
class SocketEnd {
  private static _socket: Socket;

  public static get socket() {
    return this._socket;
  }

  public static set socket(socketConnection: Socket) {
    this._socket = socketConnection;
  }

  public static createConnection(url: string = WSS) {
    if (SocketEnd.socket) {
      return SocketEnd.socket;
    }
    const socketConnection = new WebSocket(url);
    SocketEnd.socket = socketConnection;
    return SocketEnd.socket;
  }
}

export {SocketEnd};
