const vendor = require('../utils/vendor.js');
const fs = vendor('fs');
const path = vendor('path');
const merge = vendor('object-merger');
const glob = vendor('glob');

// JSON DB Tool
const DB = {
  init: {},
  relPath: (str) => path.join(__dirname, str),
  get(db) {
    return (
      fs.existsSync(db)
        ? JSON.parse(fs.readFileSync(db, 'UTF-8'))
        : DB.set(db, DB.init[db])
    );
  },
  set(db, data) {
    fs.writeFileSync(db, JSON.stringify(data, null, 2), 'UTF-8');
    return data;
  },
  put(db, data) {
    return DB.set(db, merge(DB.get(db), data));
  }
};

// Load custom DB modules
glob.sync(DB.relPath('./db-*.js')).forEach((file) => {
  const db = require(path.resolve(file))(DB);
  DB.put(db, {}); // Init DB files
});

module.exports = DB;
