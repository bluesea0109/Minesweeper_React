import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import App from "./app";
import { mount } from "enzyme";
import { cleanup, render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../redux/saga";

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe("<App />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it("Rendering test!", () => {
    const initialState = {
      feature: {
        map: [],
        mineSign: [],
        message: "",
      },
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Selecting difficulty", () => {
    const initialState = {
      feature: {
        map: [],
        mineSign: [],
        message: "",
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper.text().includes("Minesweeper")).toBe(true);
    expect(wrapper.text().includes("10 ✕ 10")).toBe(true);
    expect(wrapper.text().includes("40 ✕ 20")).toBe(true);
    expect(wrapper.text().includes("100 ✕ 50")).toBe(true);
  });
});
