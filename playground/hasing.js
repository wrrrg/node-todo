const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var password = "123abc!";

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword =
  "$2a$10$cVSH1K6O70.rNcI8qz6ppOWAWXc/AMM0mb9Xg7t1.JPgRLxziTPiq";

bcrypt.compare("password", hashedPassword, (err, res) => {
  console.log(res);
});

//
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data, "123abc");
//
// console.log(token);
//
// var decoded = jwt.verify(token, "123abc");
// console.log("decoded", decoded);
// jwt.verify()

//
//
// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + "somesecret").toString();
//
// if (resultHash === token.hash) {
//   console.log("Data was not changed");
// } else {
//   console.log("Data was altered.");
// }
