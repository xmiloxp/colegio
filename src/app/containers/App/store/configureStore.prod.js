import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../../../redux/reducers';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  return createStore(rootReducer,
    initialState,
    applyMiddleware(
      thunk, promise
    )
  );
}