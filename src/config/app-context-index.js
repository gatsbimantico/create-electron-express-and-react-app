import { useEffect, useState } from "react";
import Worker from "./app-webworker-reducer.worker";

const worker = new Worker();

const initialState = {};

export const useWebWorkerReducer = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const listenerCallback = (event) =>
      setState({
        ...state,
        ...event.data,
      });
    worker.addEventListener("message", listenerCallback);
    return () => worker.removeEventListener("message", listenerCallback);
  }, [state, setState]);

  const doAction = async (type, payload = {}) =>
    worker.postMessage({ action: { type, payload }, state });

  doAction.once = async (type, payload) => {
    const key = `UC.${type}`;
    if (!state[key]) {
      await doAction(type, payload);
      setState({ [key]: true });
    }
  };

  return [state, doAction];
};
