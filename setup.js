const fs = require('fs');

const [
    nodeExecPath,
 ] = process.argv;

 fs.writeFileSync('./.shelljsrc', `{"execPath":"${nodeExecPath}"}`);
 