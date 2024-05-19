import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { managementReducer } from "./reducer";

export const store = createStore(managementReducer, applyMiddleware(thunk));
