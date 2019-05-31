const { createEpicMiddleware } = require('redux-observable');
const { filter, mergeMap, catchError } = require('rxjs/operators');
const fetch = require('node-fetch');
const redux = require('redux');

const startTime = Date.now();

const observableMiddleware = createEpicMiddleware();
const store = redux.createStore(reducer, redux.applyMiddleware(observableMiddleware));

// observableMiddleware.run(fetchCheckTime);

const fetchCheckTime = action$ => action$.pipe(
	  filter(action => action.type === 'FETCH_CHECK_TIME'),
	  mergeMap(async (action) => {
		const url = `https://api.iextrading.com/1.0/stock/${action.symbol}/price`;
		const price = await fetch(url).then(res => res.text());
		return Object.assign({}, action, { type: 'FETCH_CHECK_TIME_SUCCESS', price });
	  }),
	  catchError(err => Promise.resolve({ type: 'FETCH_CHECK_TIME_ERROR', message: err.message }))
	);

function reducer(state = 0, action) {
  console.log(`+${Date.now() - startTime}ms`, action);

  switch (action.type) {
    case 'INCREMENT':
      return state + action.amount;
    default:
      return state;
  }
}

store.dispatch({ type: 'FETCH_CHECK_TIME' });