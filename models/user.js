var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//mongoose.connect('mongodb://localhost/myportfolioapp');
//var db = mongoose.connection;

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User',UserSchema);

module.exports.createUser = function(newUser , callback){
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback); 
    });
});
}


module.exports.getUsername = function(username,callback){
    var query = {username: username}; 
    User.findOne(query,callback);
}
module.exports.getUserID = function(id,callback){
    
    User.findById(id,callback);
}
module.exports.comparePassword = function(enteredPassword,hash,callback){
     bcrypt.compare(enteredPassword, hash, function(err, isMatch) {
     if(err) throw err;
     callback(null,isMatch);
});
}