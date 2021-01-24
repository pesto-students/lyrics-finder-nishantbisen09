import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appReducer from './reducers/';
import { watcher } from './sagas/watchers';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [sagaMiddleware, logger];
} else {
  middleware = [sagaMiddleware];
}

const store = createStore(appReducer, applyMiddleware(...middleware));

sagaMiddleware.run(watcher);

export default store;
