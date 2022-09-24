import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';

import rootReducer from './redux';

const store = createStore(rootReducer);

export default store; 