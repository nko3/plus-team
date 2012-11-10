var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Mixed = Schema.Types.Mixed;

const GENDER_MALE = "male";
const GENDER_FEMALE = "female";
const GENDER_OTHER = "other";

var User = new Schema({
  name: {
    type: String,
    index: true
  },
  email: [ String ],
  gender: {
    type: String,
    enum: [ GENDER_MALE, GENDER_FEMALE, GENDER_OTHER ]
  },
  username: String,
  githubID: String,
  githubToken: String,
  facebookID: String,
  facebookToken: String
});

User.statics.GENDER = {
  MALE: GENDER_MALE,
  FEMALE: GENDER_FEMALE,
  OTHER: GENDER_OTHER
};

exports.db = {
  User: mongoose.model('User', User)
};
