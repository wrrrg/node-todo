require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose.js");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");
var { authenticate } = require("./middleware/authenticate");

const { ObjectID } = require("mongodb");
const PORT = process.env.PORT;

var app = express();

app.use(bodyParser.json());

// Post a Todo
app.post("/todos", authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
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
app.get("/todos", authenticate, (req, res) => {
  // console.log(req.body);
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send("Invalid Todo ID");
    res.end();
  } else {
    Todo.findOne({ _id: id, _creator: req.user._id }).then(
      todo => {
        if (!todo) {
          res.status(404).send("No Todo Found");
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

// patch route (partial updates, use put for full replacements)

app.patch("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ["text", "completed"]);

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send("Invalid Todo ID");
    res.end();
  } else {
    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findOneAndUpdate(
      { _id: req.params.id, _creator: req.user._id },
      { $set: body },
      { new: true }
    )
      .then(todo => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send({ todo });
      })
      .catch(e => {
        res.status(400).send();
      });
  }
});

//delete todos

app.delete("/todos/:id", authenticate, (req, res) => {
  var id = req.params.id;
  var _creator = req.user._id;

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send("Invalid Todo ID");
    res.end();
  } else {
    //remove todo by ID
    Todo.findOneAndRemove({ _id: id, _creator }).then(
      //success
      todo => {
        //if no doc, send 404
        if (!todo) {
          res.status(404).send("No Todo Found");
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

// Post new user

app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User({
    email: body.email,
    password: body.password
  });

  // User.findByToken();

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header("x-auth", token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

// get me private route

app.get("/users/me", authenticate, (req, res) => {
  res.send(req.user);
});

// Get users

app.get("/users", (req, res) => {
  User.find().then(
    users => {
      res.send({ users });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// post login user route sending {email, password}, checking for match with hash password and submitted password

app.post("/users/login", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);

  var email = body.email;
  var password = body.password;
  var hashedPassword = "";

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header("x-auth", token).send(user);
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

// logout DELETE route for users/me/token - delete the token so that a new one is made next time you login

app.delete("/users/me/token", authenticate, (req, res) => {
  // this is a custome instance method we're going to write to remove the existing token
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
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
