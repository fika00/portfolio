import { createSlice } from "@reduxjs/toolkit";

export const positionSlice = createSlice({
  name: "position",
  initialState: {
    value: 0,
    point: 0,
    play: 0,
  },
  reducers: {
    setPosition: (state, action) => {
      state.value = action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
    },
    setPlay: (state, action) => {
      state.play = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosition, setPoint, setPlay } = positionSlice.actions;

export default positionSlice.reducer;
