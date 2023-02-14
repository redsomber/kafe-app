import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      if (state[action.payload.id]) {
        state[action.payload.id].count++;
      } else {
        state[action.payload.id] = action.payload;
      }
    },
    incCount: (state, action) => {
      if (state[action.payload.id]) {
        state[action.payload.id].count++;
        state[action.payload.id].sum += state[action.payload.id].price;
      } else {
        console.log("Item not found", action.payload.id);
      }
    },
    decCount: (state, action) => {
      if (state[action.payload.id]) {
        state[action.payload.id].count--;
        state[action.payload.id].sum -= state[action.payload.id].price;
        if (state[action.payload.id].count === 0) {
          delete state[action.payload.id];
        }
      } else {
        console.log("Item not found");
      }
    },
    resetState: (state) => {
      return state = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, incCount, decCount, resetState } = counterSlice.actions;

export default counterSlice.reducer;
