const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
//open abrindo conexão com o banco

module.exports = () => {
  return open({
    filename: "./src/db/questionq.sqlite",
    driver: sqlite3.Database,
  });
};
