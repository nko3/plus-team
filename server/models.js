var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Mixed = Schema.Types.Mixed;

var User = new Schema({
  facebook: {},
  facebookAccessToken: String,
  instagram: {},
  instagramAccessToken: String,
  github: {},
  githubAccessToken: String,
  name: {
    type: String,
    index: true
  },
  email: String
});

exports.db = {
  User: mongoose.model('User', User)
};
