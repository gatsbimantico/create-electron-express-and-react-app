module.exports = (DB) => {
  DB.USER = DB.relPath('./.db.user.json');
  DB.init[DB.USER] = {
    friends: {},
    candidates: {},
  };

  return DB.USER;
};
