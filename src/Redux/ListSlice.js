import { createSlice } from "@reduxjs/toolkit";

let ListSlice = createSlice({
  name: "list",
  initialState: { list1: [] },
  reducers: {
    add(state, action) {
      state.list1.push(action.payload);
    },
    get(state, action) {
      state.list1 = [...action.payload];
    },
    deduce(state, action) {
      let index = state.list1.findIndex(
        (item) => item.nameV === action.payload.nameV
      );
      let quant = state.list1[index];
      if (quant === 1) {
        state.list1 = state.list1.filter(
          (item) => item.namV !== action.payload.nameV
        );
      } else {
        state.list1[index] = {
          ...state.list1[index],
          quantity: state.list1[index].quantity - 1,
        };
      }
    },
  },
});

export const ListSliceActions = ListSlice.actions;
export default ListSlice.reducer;
