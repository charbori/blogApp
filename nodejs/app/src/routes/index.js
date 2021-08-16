var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json(({title:'Hello react x node.js'}));
});

router.get('/user', function(req, res) {
    res.json(({dataStatus:'1'}));
});

module.exports = router;
