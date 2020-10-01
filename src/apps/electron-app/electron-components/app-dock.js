import React from "react";
import node from "../../../utils/node";

const AppLauncher = ({ name, onClick }) => (
  <div
    style={{
      display: "inline-block",
      border: "1px solid black",
      padding: "5px",
      borderRadius: "5px",
    }}
    onClick={onClick}
  >
    {name}
  </div>
);

const AppDock = () => {
  const electron = node.require("electron");
  const newWindow = (url) => () =>
    new electron.remote.BrowserWindow().loadURL(url);

  return (
    <div style={{ margin: "10px 0" }}>
      <AppLauncher
        name="Calendar"
        onClick={newWindow("http://localhost:3002/")}
      />
      <AppLauncher
        name="Maps"
        onClick={newWindow("https://duckduckgo.com/?q=london&t=h_&ia=web&iaxm=about")}
      />
      <AppLauncher
        name="IDE"
        onClick={newWindow("http://localhost:3000/#/Users/cesar.carrera/WS/gatsbimantico/create-electron-express-and-react-app")}
      />
      <AppLauncher
        name="Facebook"
        onClick={newWindow("http://facebook.com")}
      />
      <AppLauncher
        name="Gmail"
        onClick={newWindow("http://mail.google.com")}
      />
    </div>
  );
};

export default AppDock;
