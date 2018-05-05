const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

// Todo.remove() - it can't be empty

// Todo.remove({}).then(result => {
//   console.log(result);
// });
//
// Todo.find().then(todos => {
//   console.log(todos);
// });

Todo.findByIdAndRemove("5aed78bae36463ab569d701c").then(todo => {
  console.log(todo);
});
