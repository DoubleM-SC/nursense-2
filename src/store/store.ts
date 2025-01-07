import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { getUserDataFromCookie } from "../page/cookies";

const userDataFromCookie = getUserDataFromCookie();

const initialState = {
  isAuthenticated: !!userDataFromCookie,
  user: userDataFromCookie,
  professor: userDataFromCookie?.professor || false,
};

const store: Store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export type RootState = ReturnType<typeof store.getState>;
export default store;
