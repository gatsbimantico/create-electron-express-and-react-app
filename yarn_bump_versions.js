const pkg = require('./package.json');

const dependencies = Object.keys(pkg.dependencies).concat(Object.keys(pkg.devDependencies));

const spawn = require('cross-spawn');
const child = spawn('yarn', ['add', ...dependencies], { stdio: 'inherit' });

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
