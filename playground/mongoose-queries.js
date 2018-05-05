const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

var userId = "5ae674256f99151394268235";

// var id = "5aed66e46bc3da1228f1fce0";
//
// if (!ObjectID.isValid(id)) {
//   return console.log("ID is not valid");
// }
//
// Todo.find({
//   _id: id
// }).then(todos => {
//   if (todos.length === 0) {
//     console.log("No Todos Array Found");
//   } else {
//     console.log("Todos", todos);
//   }
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   if (!todo) {
//     return console.log("No Todo found");
//   }
//   console.log("Todo", todo);
// });
//
// // findOne returns an object, find returns an array
//
// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log("No ID found");
//     }
//     console.log("Todo by ID", todo);
//   })
//   .catch(e => console.log(e));

User.findById(userId)
  .then(user => {
    if (!user) {
      return console.log("No user with this ID found");
    }
    console.log("User by ID", user);
  })
  .catch(e => console.log(e));
