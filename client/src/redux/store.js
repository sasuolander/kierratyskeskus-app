import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // middleware
import rootReducer from './reducers/RootReducer';

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
   // get dev tool. https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
   + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // enables the redux dev tool in browser.
  );
}