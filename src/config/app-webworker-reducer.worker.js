import { reducers } from '../business-logic/index';

let count = 0;
// let reducers = [];

self.addEventListener("message", (e) => { // eslint-disable-line no-restricted-globals
  if (!e) return;
  const { action, state } = e.data;
  const newState = {};
  const t0 = new Date().getTime();
  count += 1;

  Object.assign(newState, ...reducers.map(reducer => {
      const fn = reducer[action.type];
      if (!fn) return undefined;
      return fn({ action, state });
  }));

  postMessage({
    ...state,
    ...newState.state,
    // ...action.payload,
    wwStats: {
        ellapsed: new Date().getTime() - t0,
        count,
    },
  });
});
