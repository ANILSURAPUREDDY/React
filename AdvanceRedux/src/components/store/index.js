// import { configureStore, createSlice } from "@reduxjs/toolkit";

// const initialStore = { showToggle: false };

// const shoppingSlice = createSlice({
//   name: "shopping",
//   initialState: initialStore,
//   reducers: {
//     toggle(store) {
//       store.showToggle = !store.showToggle;
//     },
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;
