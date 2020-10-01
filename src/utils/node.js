const node_modules = {};

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
    if (!node_modules['shelljs']) {
      node_modules['shelljs'] = node.require("shelljs");
      node_modules['shelljs'].config.execPath = node_modules['shelljs'].env.NODE;
    }
    return node_modules['shelljs'];
  },
  // run(command) {
  //   const validCommands = [2304778544449, 35724823873, 1004141];
  //   if (validCommands.indexOf(command) !== -1) {
  //     return node.sh.exec(`node ./src/apps/node-app/scripts/index.js ${command}`);
  //   }
  // }
};

export default node;
