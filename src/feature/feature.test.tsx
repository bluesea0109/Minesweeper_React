import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { Feature } from "./feature";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import { cleanup } from "@testing-library/react";

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

const initialState = {
  feature: {
    map: [],
    mineSign: [],
    message: ""
  }
};

describe("<Feature />", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it(">>>FEATURE--- Snapshot", () => {
    const store = mockStore(initialState);
    const mapData: string[] = [];
    const tree = renderer.create(
        <Provider store={store}>
          <Feature mapData={mapData} />
        </Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("cell rendering correctly", () => {
    const store = mockStore(initialState);
    const mapData: string[] = [
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
      "□□□□□□□□□□",
    ];
    const wrapper = mount(      
      <Provider store={store}>
        <Feature mapData={mapData} />
      </Provider>
    );
    const element = wrapper.find("cell-1-1");
    expect(element).toBeTruthy();
  });
});
