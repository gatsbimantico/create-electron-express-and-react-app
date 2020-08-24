import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { getEnv } from './config/app-entry-points';
import AppContextProvider from './config/app-context';

if (typeof document !== "undefined") {
  const environment = getEnv();
  environment.forEach((App) => {
    Array.from(document.getElementsByClassName(App.className)).forEach((element) =>
      ReactDOM.render((
        <Suspense fallback={<div>Loading...</div>}>
            <AppContextProvider>
                <App.EntryPoint html={element.innerHTML} />
            </AppContextProvider>
        </Suspense>
      ), element)
    );
  });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
