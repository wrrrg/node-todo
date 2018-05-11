const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// instance methods get saved to the .methods
//this method overrides a default mongoose method to affect what we send back to the client
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id", "email"]);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, "abc123")
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

//model methods go on .statics, instance methods go on .methods.
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, "abc123");
  } catch (e) {
    return Promise.reject();
  }
  //we use quotes to access nested values on the user model
  return User.findOne({
    _id: decoded._id,
    "tokens.token": token,
    "tokens.access": "auth"
  });
};

//logging in with credentials
// User.findByCredentials(body.email, body.password).then(user => {
//
// }).catch(e => {
//
// })
UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

//mongoose middleware to hash passwords before we save the user
// we use a regular function instead of arrow so we have access to 'this' variable, and we have to call next() or it will never proceed
UserSchema.pre("save", function(next) {
  var user = this;

  // this way we only hash the password when the password is modified, everything else doesn't matter
  if (user.isModified("password")) {
    //user.password gives us access to the password, here is where we hash it
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        //here we set the user password = the hashed password
        user.password = hash;
        // here we move on if everything is successful
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = { User };
