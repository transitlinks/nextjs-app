import { useMemo } from 'react';
import { createStore, applyMiddleware, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducers, { RootState } from './reducers';

let store: {
  getState: () => {}
} | undefined;

function initStore(initialState: RootState) {

  const middleware: [Middleware] = [thunkMiddleware];
  if (process.env.NODE_ENV === 'development') {
    middleware.push(reduxLogger);
  }

  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
  )
}

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
