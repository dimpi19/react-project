import { legacy_createStore as createStore } from "redux";
import { myReducer } from "./Reduser";

// Load cart from localStorage if exists
const loadState = () => {
  try {
    const storedData = localStorage.getItem("cart");
    return storedData ? JSON.parse(storedData) : [];
  } catch {
    return [];
  }
};

// Create store with initial localStorage data
export const myStore = createStore(myReducer, loadState());

// Save Redux changes to localStorage
myStore.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(myStore.getState()));
});
