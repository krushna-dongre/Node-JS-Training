const db = require("./db");

module.exports = function createPost(username, data) {
  db.posts.push({
    username: username,
    post: data,
    date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
  });
};
