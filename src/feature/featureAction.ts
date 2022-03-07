import {
  take, put, call, apply, fork,
} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {SocketEnd} from '../socketConnection/socketConfig';
import {setMap, updateMessage} from './featureReducer';

function createSocketChannel(socket: any) {
  return eventChannel((emit) => {
    const handleOnMessage = (event: any) => {
      emit(event.data);
    };

    const errorHandler = (errorEvent: any) => {
      emit(new Error(errorEvent?.reason || 'UKNOWN'));
    };

    socket.addEventListener('message', handleOnMessage);
    socket.addEventListener('error', errorHandler);

    const unsubscribe = () => {
      socket.removeEventListener('message', handleOnMessage);
    };

    return unsubscribe;
  });
}

function* getMap(socket: any) {
  yield apply(socket, socket.send, ['map']);
}

export function* ReceivingData(action: any) {
  yield apply(SocketEnd.socket, SocketEnd.socket.send, [action.payload]);
}

export function* watchChannel(): any {
  const socket: any = yield call(SocketEnd.createConnection);
  const socketChannel = yield call(createSocketChannel, socket);

  while (true) {
    try {
      const data = yield take(socketChannel);
      if (data.includes('map:')) {
        yield put(setMap(data));
      }
      if (data.includes('new:')) {
        yield fork(getMap, socket);
      }
      if (data.includes('open:')) {
        yield put(updateMessage(data.split('open: ')[1]));
        yield fork(getMap, socket);
      }
    } catch (err) {
      alert(err);
      console.error('socket error:', err);
      socketChannel.close();
    }
  }
}

