import React from "react";
import node from "../utils/node";

function App() {
  window.shelljs = node.sh;

  return (
    <div>
        Client App
    </div>
  );
}

export default App;
