// Actions
const LOAD   = 'react-redux-check/widgetLoginForm/LOAD';
const LOGIN = 'react-redux-check/widgetLoginForm/LOGIN';
const LOGOUT = 'react-redux-check/widgetLoginForm/LOGOUT';


// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function loginWidget(widget) {
  return { type: LOGIN, widget };
}

export function logoutWidget(widget) {
  return { type: LOGOUT, widget };
}