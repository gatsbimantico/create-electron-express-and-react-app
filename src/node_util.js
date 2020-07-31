let shFirstTime = true;

const node = {
  get enabled() {
    return typeof this.require === "function";
  },
  get require() {
    let res = null;
    try {
      res = window.require;
    } catch (e) {
      res = null;
    }
    return res;
  },
  get sh() {
    const sh = node.require("shelljs");
    if (shFirstTime) {
      const fs = node.require("fs");
      const shelljsrc = JSON.parse(fs.readFileSync("./.shelljsrc", "UTF-8"));
      Object.keys(shelljsrc).forEach((confKey) => {
        sh.config[confKey] = shelljsrc[confKey];
      });
      shFirstTime = false;
    }
    return sh;
  },
  run(command) {
    const validCommands = [2304778544449, 35724823873, 1004141];
    if (validCommands.indexOf(command) !== -1) {
      return node.sh.exec(`node ./src/apps/node-app/scripts/index.js ${command}`);
    }
  }
};

export default node;
