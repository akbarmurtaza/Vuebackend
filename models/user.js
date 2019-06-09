var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    user_name: {type: String, max: 100},
    email: {type: String, max: 100},
    phone: {type: String, max: 100},
    password: {type: String, max: 100}
  }
);

//Export model
module.exports = mongoose.model('User',UserSchema);
