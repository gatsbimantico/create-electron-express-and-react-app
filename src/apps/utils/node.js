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
    // if (!node_modules['shelljs']) {
      node_modules['shelljs'] = node.require("shelljs");
      const fs = node.require("fs");
      const path = node.require("path");
      
      console.log(require('os').homedir())
      console.log(require('os'))
      console.log(fs.readdirSync(path.join(require('os').homedir())));
      // const shelljsrc = JSON.parse(fs.readFileSync("./.shelljsrc", "UTF-8"));
      // Object.keys(shelljsrc).forEach((confKey) => {
      //   node_modules['shelljs'].config[confKey] = shelljsrc[confKey];
      // });
    // }
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
