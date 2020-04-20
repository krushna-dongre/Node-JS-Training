var express = require("express");
var router = express.Router();
var middleWare = require("../middleware/auth-middleware");
var checkLogin = require("../helpers/auth-helper");
var userDetails = require("../helpers/user-helper");
var getPosts = require("../helpers/post-helper");
var newPost = require("../helpers/newPost-helper");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Use your api request to fetch data");
});

router.post("/login", (req, res) => {
  const cred = req.body;

  if (!cred.username || !cred.password) {
    return res.status(400).send({ status: "not ok" });
  }

  var isValid = checkLogin(cred.username, cred.password);
  var user = userDetails(cred.username);
  if (isValid) {
    res.cookie("is_loggedin", "yes");
    res.cookie("username", cred.username);
    res.cookie("email", user.email);
  }
  res.status(200).send(
    JSON.stringify({
      status: isValid ? "ok" : "invalid",
    })
  );
});

router.get("/posts", middleWare, function (req, res, next) {
  var posts = getPosts();
  res.send(posts);
});

router.post("/newPost", middleWare, function (req, res, next) {
  var article = req.body.postData;
  var username = req.body.username;

  var result = newPost(username, article);

  res.status(200).send(
    JSON.stringify({
      status: result ? "ok" : "invalid",
    })
  );
});

module.exports = router;
