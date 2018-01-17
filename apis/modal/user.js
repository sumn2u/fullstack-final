var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var Photo = require('./photo');
var Schema = mongoose.Schema;

// public userId :number;
// public firstName : string;
// public lastName : string;
// public userName: string;
// public password: string;
// public created :Date;
// public photoList :Photo[];
// public likedPhotoList:Photo[];

var UserSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	commentId:{
		type:Number
	},
	firstName:{
		type:String
	},
	lastName:{
		type:String
	},
	created :{ type: Date, default: Date.now },

	password: {
		type: String,
		required: true
	},
	admin:{type:Boolean, default:false},
	photoList:Array,
	likedPhotoList:Array
});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
// set up a mongoose model
module.exports = mongoose.model('User', UserSchema);