var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema(
  {
    f_name: {type: String, max: 100},
    l_name: {type: String, max: 100},
    cnic: {type: String, max: 100},
    dob: {type: Date},
    registration_number: {type: String, max: 100},
    registration_date: {type: Date},
    email: {type: String, max: 100},
    mobile: {type: String, max: 100},
    phone: {type: String, max: 100},
    address: {type: String, max: 100},
    other_info: {type: String, max: 100}
  }
);

//Export model
module.exports = mongoose.model('Patient',PatientSchema);
