import React, { useContext } from "react";
import node from "../utils/node";
import { DispatchContext, StoreContext } from "../../config/app-context";
import ucElectronAppLanding from "../../business-logic/electron-app-landing";

const t0 = new Date().getTime();

function App() {
    const state = useContext(StoreContext);
    const dispatch = useContext(DispatchContext);
    console.log('node.sh.config.execPath', node.sh.config.execPath);
    if (!node.sh.config.execPath) {
        dispatch.once(ucElectronAppLanding.LANDS_WITH_UNKNOWN_CONFIG);
    } else {
        dispatch.once(ucElectronAppLanding.LANDS_WITH_MIN_CONFIG);
    }
    console.log('state', state);

    window.shelljs = node.sh;

    return (
    <div>
        <br />
        <br />
        <br />
        Electron App {state['electronAppLanding.landed'] ? '(landed)' : '(loading)'}
        <br />
        <br />
        <p>Reducers: {state.wwStats?.ellapsed}</p>
        <p>Reducers: {state.wwStats?.count}</p>
        <p>Seconds: {(new Date().getTime() - t0)/1000}</p>
        <br />
        <br />
        <button onClick={() => alert('clicked')}>Alert!</button>


    </div>
  );
}

export default App;
