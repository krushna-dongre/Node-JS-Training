const db = require("./db");

module.exports = function userDetails(username) {
  const result = db.credentials.filter((entry) => {
    return entry.username === username;
  });

  if (result.length !== 1) {
    return null;
  }

  return result[0];
};
