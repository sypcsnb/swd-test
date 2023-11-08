import { configureStore } from "@reduxjs/toolkit";
import formsReducer from "./form";
import updateByUuidReducer from "./updateByUuid";

const formsLocalStorage = JSON.parse(localStorage.getItem("forms") || "[]");
const store = configureStore({
  reducer: {
    forms: formsReducer,
    updateByUuid: updateByUuidReducer,
  },
  preloadedState: { forms: formsLocalStorage },
});

store.subscribe(() => {
  localStorage.setItem("forms", JSON.stringify(store.getState().forms));
});

export default store;
