import React, { useContext, useEffect } from "react";
import node from "../../utils/node";
import { DispatchContext, StoreContext } from "../../config/app-context";
import ucElectronAppLanding from "../../business-logic/electron-app-landing";

const t0 = new Date().getTime();

function App() {
    const state = useContext(StoreContext);
    const dispatch = useContext(DispatchContext);
    if (!node.sh.config.execPath) {
        dispatch.once(ucElectronAppLanding.LANDS_WITH_UNKNOWN_CONFIG);
    } else {
        dispatch.once(ucElectronAppLanding.LANDS_WITH_MIN_CONFIG);
    }
    console.log('state', state);

    window.shelljs = node.sh;

    useEffect(() => {
        const cb = (event) => dispatch('KEY_PRESSED', { key: event.key })
        window.addEventListener('keydown', cb);
        return () => window.removeEventListener('keydown', cb);
    }, [dispatch]);

    return (
    <div>
        <br />
        <br />
        <br />
        Electron App {state['electronAppLanding.landed'] ? '(landed)' : '(loading)'}
        <br />
        <br />
        <p>Ellapsed: {state['wwStats.ellapsed']}</p>
        <p>Executions: {state['wwStats.count']}</p>
        <p>Key Pressed: {state['currently.pressed']}</p>
        <p>Seconds: {(new Date().getTime() - t0)/1000}</p>
        <br />
        <br />
        <button onClick={() => alert('clicked')}>Alert!</button>


    </div>
  );
}

export default App;
