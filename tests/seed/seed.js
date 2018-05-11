const { ObjectID } = require("mongodb");
const jwt = require("jsonwebtoken");
const { Todo } = require("./../../server/models/todo");
const { User } = require("./../../server/models/user");

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
  {
    _id: userOneId,
    email: "normal@example.com",
    password: "firstPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userOneId, access: "auth" }, "abc123").toString()
      }
    ]
  },
  {
    _id: userTwoId,
    email: "notoken@example.com",
    password: "secondPass",
    tokens: [
      {
        access: "auth",
        token: jwt.sign({ _id: userTwoId, access: "auth" }, "abc123").toString()
      }
    ]
  }
];

const populateUsers = done => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]).then(() => done());
  });
};

const todos = [
  {
    _id: new ObjectID(),
    text: "first test todo proof",
    _creator: userOneId
  },
  {
    _id: new ObjectID(),
    text: "second test todo proof",
    completed: true,
    completedAt: 333,
    _creator: userTwoId
  }
];

const populateTodos = done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
};

module.exports = {
  todos,
  users,
  populateTodos,
  populateUsers
};
