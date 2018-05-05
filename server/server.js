var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose.js");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

const { ObjectID } = require("mongodb");
const PORT = process.env.PORT || 3000;

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
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send("Invalid Todo ID");
    res.end();
  } else {
    Todo.findById({ _id: id }).then(
      todo => {
        if (!todo) {
          res.status(404).send("No Todo Found");
          console.log("No Todo Found");
          res.end();
        } else {
          res.status(200).send({ todo });
        }
      },
      e => {
        res.status(400).send(e);
      }
    );
  }
});

//delete todos

app.delete("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send("Invalid Todo ID");
    res.end();
  } else {
    //remove todo by ID
    Todo.findByIdAndRemove({ _id: id }).then(
      //success
      todo => {
        //if no doc, send 404
        if (!todo) {
          res.status(404).send("No Todo Found");
          console.log("No Todo Found");
          res.end();
        } else {
          //found ID send and remove
          res.status(200).send({ todo });
        }
      },
      //error

      e => {
        //400 empty body
        res.status(400).send(e);
      }
    );
  }
});

app.listen(PORT, () => {
  console.log(`Started on ${PORT}!!`);
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
