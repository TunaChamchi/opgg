import { createStore, applyMiddleware, compose } from "redux";
import { Action, AnyAction, AsyncThunkAction,  } from '@reduxjs/toolkit';
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from ".";

const isProduction = process.env.NODE_ENV === "production";

const makeStore = () => {
  const enhancer = isProduction
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(thunk));
  const store = createStore(rootReducer, enhancer);
  const dispatch = store.dispatch;
  return store;
};

const store = makeStore();

export type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper(makeStore, { debug: !isProduction });

export default wrapper;