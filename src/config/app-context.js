import React, { createContext } from 'react';
import { useWebWorkerReducer } from './app-context-index';

export const StoreContext = createContext();
export const DispatchContext = createContext();

export default function AppContextProvider({ children }) {
    const [state, dispatch] = useWebWorkerReducer();

    return (
        <DispatchContext.Provider value={dispatch}>
            <StoreContext.Provider value={state} >
                {children}
            </StoreContext.Provider>
        </DispatchContext.Provider>
    );
};
