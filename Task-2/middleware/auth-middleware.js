module.exports = function (req, res, next) {
  const cookies = req.cookies;
  if (cookies.is_loggedin) {
    next();
  } else {
    res.send(401);
  }
};
