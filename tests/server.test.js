const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server.js");
const { Todo } = require("./../models/todo.js");

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text });
  });
});
