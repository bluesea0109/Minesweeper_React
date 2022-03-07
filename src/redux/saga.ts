import {takeLatest} from 'redux-saga/effects';
import {
  watchChannel,
  ReceivingData,
} from '../feature/featureAction';
import {
  newRound,
  initRound,
} from '../feature/featureReducer';

export function* watcherSaga() {
  yield takeLatest(initRound.type, watchChannel);
  yield takeLatest(newRound.type, ReceivingData);
}
