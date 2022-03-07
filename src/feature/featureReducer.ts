import { createSlice } from "@reduxjs/toolkit";

const onFetchMap = (payload: any): string[] => {
  const rowList = payload.split("map:")[1].split("\n");
  return rowList.filter((item: string[]) => !!item.length);
}

interface FeatureState {
  map: string[];
  mineSign: string[];
  message: string;
}

const initialState: FeatureState = {
  map: [],
  mineSign: [],
  message: "",
};

const featureStore = createSlice({
  name: "feature",
  initialState,
  reducers: {
    initRound(state) {
      state.mineSign = [];
      state.message = "";
    },
    restartRound(state, action) {
      state.mineSign = [];
      state.message = "";
    },
    updateMineSign(state, action) {
      state.mineSign = [...action.payload];
    },
    newRound(state, action) {
    },
    getMap(state) {},
    setMap(state, action) {
      state.map = onFetchMap(action.payload);
    },
    updateMessage(state, action) {
      state.message = action.payload;
    },
  },
});

export const {
  initRound,
  getMap,
  setMap,
  newRound,
  updateMessage,
  updateMineSign,
  restartRound,
} = featureStore.actions;

export const featureReducer = featureStore.reducer;
