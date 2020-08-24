import React from 'react';

const ENV = {
    ELECTRON: [{
        className: 'react-root',
        EntryPoint: React.lazy(() => import('../apps/electron-app/App')),
    }],
    CLIENT: [{
        className: 'react-root',
        EntryPoint: React.lazy(() => import('../apps/client-app/App')),
    }],
    // SERVER: [{ // Server-side app
    //     className: 'react-root',
    //     EntryPoint: React.lazy(() => import('../apps/server-app/App')),
    // }],
}

function electronNodeRequiredIsAvailable() {
    let req;
    try {
      req = window.require;
    } catch (e) {
      req = null;
    }
    return typeof req === "function";
}

export function getEnv() {
    if (electronNodeRequiredIsAvailable()) return ENV.ELECTRON;

    // otherwise
    return ENV.CLIENT;
}
