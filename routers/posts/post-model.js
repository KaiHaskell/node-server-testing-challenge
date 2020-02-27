const db = require("../../data/dbConfig");

module.exports = {
  getAll
};

function getAll() {
  return db("posts").select("id", "title", "content");
}
