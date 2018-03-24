import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import stocks from "./stockReducer.js";

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

const store = combineReducers({
  stocks
});

export default createStoreWithMiddleware(
  store,
  //For Redux Chrome Extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
