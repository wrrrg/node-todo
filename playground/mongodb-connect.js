// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDb");
  }
  console.log("Connected to Mongo!");

  const db = client.db("TodoApp");

  // db
  //   .collection("Todos")
  //   .find()
  //   .count()
  //   .then(
  //     count => {
  //       console.log(`Todos count: ${count}`);
  //     },
  //     err => {
  //       console.log("unable to fetch todos", err);
  //     }
  //   );
  db
    .collection("Users")
    .find({ name: "Bill" })
    .toArray()
    .then(
      docs => {
        console.log(`Users: `, docs);
      },
      err => {
        console.log("unable to fetch users", err);
      }
    );

  // db.collection("Todos").insertOne(
  //   {
  //     text: "Something to do",
  //     completed: false
  //   },
  //   (err, result) => {
  //     if (err) {
  //       return console.log("Unable to insert todo ", err);
  //     }
  //
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  //   }
  // );
  //
  // db.collection("Users").insertOne(
  //   {
  //     name: "Erin",
  //     age: 27,
  //     location: "Austin, TX"
  //   },
  //   (err, result) => {
  //     if (err) {
  //       return console.log("Unable to insert User ", err);
  //     }
  //
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  //     console.log(result.ops[0]._id.getTimestamp());
  //   }
  // );

  client.close();
});
