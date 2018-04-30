var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose.js");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();

app.use(bodyParser.json());

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
