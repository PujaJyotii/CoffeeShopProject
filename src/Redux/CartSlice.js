import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    add(state, action) {
      let index = state.cart.findIndex(
        (el) => el.nameV === action.payload.nameV
      );
      if (index === -1) {
        state.cart.push(action.payload);
      } else {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount + 1,
        };
      }
    },
    get(state, action) {
      state.cart = [...action.payload];
    },
    increase(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameV === action.payload.nameV
      );
      state.cart[index] = {
        ...state.cart[index],
        amount: state.cart[index].amount + 1,
      };
    },
    decrease(state, action) {
      let index = state.cart.findIndex(
        (item) => item.nameV === action.payload.nameV
      );
      let amount1 = state.cart[index].amount;
      if (amount1 === 1) {
        state.cart = state.cart.filter(
          (item) => item.nameV !== action.payload.nameV
        );
      } else {
        state.cart[index] = {
          ...state.cart[index],
          amount: state.cart[index].amount - 1,
        };
      }
    },
  },
});

export const CartSliceAction = CartSlice.actions;
export default CartSlice.reducer;
