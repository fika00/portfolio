import { configureStore } from "@reduxjs/toolkit";
import setPosition from "./slice";
import setPoint from "./slice";
import setPlay from "./slice";

export const store = configureStore({
  reducer: {
    position: setPosition,
    point: setPoint,
    play: setPlay,
  },
});
