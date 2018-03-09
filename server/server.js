const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./model/todo/todo');
const {User} = require('./model/user/user');

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todoOne = new Todo({
        title: req.body.title
    });
    todoOne.save().then((todo) => {
        res.send(todo);
    }).catch((error) => {
        console.log(error);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(ObjectID.isValid(id)){
        Todo.findById(id).then((todo) => {
            if(todo === null){
                res.send({error: "ID not found", status: 404});
            } else {
                res.send({todo, status: 200});
            }
        });
    } else {
        res.send({error: "ID not valid", status: 400});
    }
});

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(ObjectID.isValid(id)){
        Todo.findByIdAndRemove(id).then((todo) => {
            if(todo === null){
                res.send({error: "ID not found", status: 404});
            } else {
                res.send({todo, status: 200});
            }
        });
    } else {
        res.send({error: "ID not valid", status: 400});
    }
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
  var body = _.pick(req.body, ['title', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.listen(3000, () => {
    console.log("Node Server running at port 3000");
})
