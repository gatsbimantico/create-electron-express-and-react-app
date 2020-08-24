import * as ElectronAppLanding from "./electron-app-landing";

export const initialState = {
//   ...ElectronAppLanding.initialState,
};

export const reducerMapList = [];

/**
 * Provides or creates a reducerMap by index
 */
function getReducerMap(id) {
  reducerMapList[id] = reducerMapList[id] || {};
  return reducerMapList[id];
}

function bootstrapReducers(...collections) {
  for (let collection of collections) {
      for (let key in collection.reducer) {
          let index = 0;
          while(getReducerMap(index)[key]) {
              index += 1;
          }
          getReducerMap(index)[key] = collection.reducer[key];
      }
  }
  return reducerMapList;
}

export const reducers = bootstrapReducers(
    ElectronAppLanding,
);
