// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDb");
  }
  console.log("Connected to Mongo!");

  const db = client.db("TodoApp");

  // delete many / one
  db
    .collection("Users")
    .deleteMany({ name: "Chris" })
    .then(
      result => {
        console.log(result);
      },
      err => {
        console.log("unable to fetch users", err);
      }
    );

  //find one and delete

  db
    .collection("Users")
    .findOneAndDelete({ _id: new ObjectId("5ae66abdc0151cbd9d4c3622") })
    .then(result => {
      console.log(result);
    });

  client.close();
});
