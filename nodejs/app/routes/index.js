var express = require('express');
var router = express.Router();
//var mongoDB = require('../nodeApi/mongooseConnect');
var TodoModel = require('../model/todo');

router.get('/', function(req, res) {
    res.json(({title:'Hello react x node.js'}));
});

router.get('/user', function(req, res) {
    res.json(({dataStatus:'1'}));
});

router.get('/user/mongodb', function(req, res) {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
        console.log("mongo db connection ok. ");
    });
});

router.post('/user/set', function(req, res) {
    var todo = new TodoModel({
        todoid: req.body.id,
        content: req.body.content,
        completed: false
    });

    todo.save
        .then(() => console.log('saved successfully'));
});

router.get('/user/get', function(req, res) {
    TodoModel.findAll()
        .then((todos) => {
            if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
            res.send(`find successfully: ${todos}`);
        })
        .catch(err => res.status(500).send(err));
});

module.exports = router;
