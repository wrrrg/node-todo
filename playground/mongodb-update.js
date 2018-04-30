// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectId } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
  if (err) {
    return console.log("Unable to connect to MongoDb");
  }
  console.log("Connected to Mongo!");

  const db = client.db("TodoApp");

  //   //find one and update
  //
  //   db
  //     .collection("Users")
  //     .findOneAndUpdate(
  //       {
  //         _id: new ObjectId("5ae66c76c0151cbd9d4c36b9")
  //       },
  //       {
  //         $set: {
  //           completed: true
  //         }
  //       },
  //       {
  //         returnOriginal: false
  //       }
  //     )
  //     .then(result => {
  //       console.log(result);
  //     });
  //
  //   client.close();
  // });
  //find one and update with inc

  db
    .collection("Users")
    .findOneAndUpdate(
      {
        _id: new ObjectId("5ae60b4387a3f74fb4e9a649")
      },
      {
        $set: {
          name: "Ernieee"
        },

        $inc: {
          age: -1
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(result => {
      console.log(result);
    });

  client.close();
});
