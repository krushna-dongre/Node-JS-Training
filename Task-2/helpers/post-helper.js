const db = require("./db");

module.exports = function getPosts() {
  var sortedPosts = db.posts;
  sortedPosts.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });
  return sortedPosts;
};
