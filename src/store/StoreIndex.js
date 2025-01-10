import { combineReducers, createStore } from "redux";
import ProductReducer from "./ProductReducer";
import { ActiveFilter } from "./Slices/ActiveFilter";

const reducer = combineReducers({
  Products: ProductReducer,
  Active: ActiveFilter,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);