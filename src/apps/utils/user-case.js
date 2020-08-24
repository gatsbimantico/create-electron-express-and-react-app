// import { useEffect, useState } from "react";

// const USER_CASES = {};
// let store = {};
// const calls = {};

// export function define(userCase, callback) {
//   USER_CASES[userCase] = callback;
// }

// export function useUserCase(userCase, recursiveSteps = 1) {
//   const [queue, setQueue] = useState([]);
//   const fallback = () => store;
//   let doUserCase

//   useEffect(() => {
//     const doUserCase = (...args) => {
//       const newStore = (USER_CASES[userCase] || fallback)(store, ...args);
//       store = newStore;
//       setQueue(newState);
//       return newStore;
//     };
//   }, [queue]);

//   return [store, doUserCase];
// }
