import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialStore = { counter: 0, showToggle: true };

const counterSlice = createSlice({
  name: "count",
  initialState: initialStore,
  reducers: {
    increment(store) {
      console.log("store", store.counter);
      store.counter++;
    },
    decrement(store) {
      store.counter--;
    },
    increase(store, action) {
      store.counter = store.counter + action.payload;
    },
    toggle(store) {
      store.showToggle = !store.showToggle;
    },
  },
});

const initialAuth = { isAuthtication: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuth,
  reducers: {
    login(store) {
      store.isAuthtication = true;
    },
    logout(store) {
      store.isAuthtication = false;
    },
  },
});

// const counterReducer = (store = initialStore, action)=>{
//     if( action.type === 'increment'){
//         return{
//             counter : store.counter +1,
//             showToggle :store.showToggle
//         }
//     }

//     if(action.type === 'increase'){
//         return {
//             counter : store.counter + action.amount,
//             showToggle:store.showToggle
//         }
//     }

//     if(action.type === 'decrement'){
//         return {
//             counter : store.counter -1,
//             showToggle:store.showToggle
//         }
//     }

//     if( action.type === 'toggle'){
//         return {
//             showToggle :!store.showToggle,
//             counter : store.counter
//         }
//     }

//     return store
// }

// const store = configureStore({
//     counter: counterSlice.reducer
// });

const store = configureStore({
  reducer: { count: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterAction = counterSlice.actions;
export const authAction = authSlice.actions;

export default store;
