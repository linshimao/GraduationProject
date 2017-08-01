var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('main/index');
});

// router.get('/content', function (req, res) {
//   res.render('main/content');
// });
module.exports = router;


















