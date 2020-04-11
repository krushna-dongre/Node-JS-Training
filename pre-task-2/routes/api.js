var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Access user profile with correct Get request');
});

const userDetailsObject = { name: 'Krushna Dongre', email: 'Krushna_Dongre@epam.com', contact: "8008665771"};

router.get('/userDetails', function(req, res) {
  res.setHeader('content-type', 'application/json');
  const data = JSON.stringify(userDetailsObject);
  res.send(data);
});

module.exports = router;
