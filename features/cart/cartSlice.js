import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderFoods: {},
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addToCart: (state, action) => {
      const { foodId, quantity } = action.payload;
      state.orderFoods = { ...state.orderFoods, [foodId]: quantity };
      // const existItems = state.cartItems.findIndex(
      //   (x) => x.id === item.id && x.note === item.note
      // );
      // const quantity = item.newQuantity ? item.newQuantity : 1;
      // if (existItems >= 0) {
      //   state.cartItems[existItems].quantity += 1;
      // } else {
      //   state.cartItems.push({ ...item, quantity });
      // }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (x) => x.id === item.id && x.note === item.note
      );
      state.cartItems = [
        ...state.cartItems.slice(0, itemIndex),
        ...state.cartItems.slice(itemIndex + 1),
      ];
    },
    increaseCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((x) => x._id === itemId);
      state.cartItems[itemIndex].quantity += 1;
    },
    decreaseCart: (state, action) => {
      const item = action.payload;

      const existItems = state.cartItems.findIndex(
        (x) => x.id === item.id && x.note === item.note
      );
      if (existItems >= 0) {
        state.cartItems[existItems].quantity -= 1;
      }
    },
  },
});

export const selectMenuItems = (state) => state.cart.cartItems;
export const selectMenuItemWithId = (state, id) =>
  state.cart.cartItems.filter((item) => item.id === id);
export const calculateTotalItemsWithId = (state, id) =>
  state.cart.cartItems
    .filter((item) => item.id === id)
    .reduce((total, item) => (total += item.quantity), 0);
export const calculateTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => (total += item.quantity), 0);
export const calculateTotalMoney = (state) =>
  state.cart.cartItems.reduce(
    (price, item) => item.price * item.quantity + price,
    0
  );

export const {
  setLoading,
  clearCart,
  addToCart,
  removeFromCart,
  increaseCart,
  decreaseCart,
} = cartSlice.actions;
export default cartSlice.reducer;
