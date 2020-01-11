import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { sagaMonitor } from "../reactotron-config";
import rootSaga from "./sagas/index";

import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
  auth: authReducer
});
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
