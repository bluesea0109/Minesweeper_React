import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { featureReducer } from "./feature/featureReducer";
import { watcherSaga } from "./redux/saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    feature: featureReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [
      ...getDefaultMiddleware({
        thunk: false,
      }),
      sagaMiddleware,
    ];
  },
});

sagaMiddleware.run(watcherSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
