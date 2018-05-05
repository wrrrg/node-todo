var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose.js");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const { ObjectID } = require("mongodb");

var app = express();

app.use(bodyParser.json());

// Post a Todo
app.post("/todos", (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// Get All Todos
app.get("/todos", (req, res) => {
  console.log(req.body);
  Todo.find().then(
    todos => {
      res.send({ todos });
      console.log({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send("Invalid User ID");
    res.end();
  } else {
    Todo.findById({ _id: id }).then(
      todo => {
        if (!todo) {
          res.status(404).send("No Todo Found");
          console.log("No Todo Found");
          res.end();
        } else {
          res.send({ todo });
          console.log({ todo });
        }
      },
      e => {
        res.status(400).send(e);
      }
    );
  }
});

app.listen(3000, () => {
  console.log("Started on 3000!");
});

//
// var newUser = new User({
//   email: "test@test.com"
// });
//
// newUser.save().then(
//   doc => {
//     console.log("Saved user", doc);
//   },
//   e => {
//     console.log("Unable to save user");
//   }
// );
// // var newTodo = new Todo({
//   text: "Short",
//   completedAt: new Date()
// });
//
// newTodo.save().then(
//   doc => {
//     console.log("Saved todo", doc);
//   },
//   e => {
//     console.log("Unable to save todo");
//   }
// );

module.exports = { app };
