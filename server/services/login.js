var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('users');
	var username = msg.username;
	var password = msg.password;

	coll.findOne({"username" : username}, function(err,results){
			if (results) {
				// This way subsequent requests will know the user is logged in.
				// get salt and hash it with password and check if two passwords
				// are same or not!
				
				var get_salt = results.salt;
				var get_password = results.password;
				
				var sha512 = function(password, salt){
				    var hash = crypto.createHmac('sha512', salt); 
				    hash.update(password);
				    var value = hash.digest('hex');
				    return {
				        salt:salt,
				        passwordHash:value
				    };
				};
				
				var hashed_pass;				
				function saltHashPassword(userpassword) {
				    var salt = get_salt; /** Gives us salt of length 16 */
				    var passwordData = sha512(userpassword, salt);
				    hashed_pass = passwordData.passwordHash;				    
				}				
				
				saltHashPassword(password);
				
				if(hashed_pass === get_password){
					console.log("user is valid");
					logger.log('info','signin was successful');
					
					//get the last loggedin time from db
					var coll = mongo.collection('last_login');
						coll.findOne({"user_id": results.user_id}, function(err, log_in){
							if (log_in) {

								logger.log('info','found last_loggedin time');
								//update new time
								coll.update({"user_id" :  results.user_id},{$set:{"last_visited" : Date()}}, function(err, results){
									if (results) {
										logger.log('info','updated last_loggedin time as');										

									} else {
										logger.log('info','could not update last visited time');
									}
								});								

							} else {
								logger.log('info','not found last_loggedin time');
								coll.insert({"user_id" :  results.user_id,"last_visited" : Date()}, function(err, results){
									if (results) {
										logger.log('info','inserted last_loggedin time as');
									} else {
										logger.log('info','could not insert last visited time');
									}
								});

							}

						});	
						console.log("user is present");
						res.code = "200";
						res.user_id = results.user_id;
												

				}else{
					logger.log('info','user is not authorized');
					res.code = "401";					
				}

			} else {
				logger.log('info','query for signin was failed');
				console.log("returned false");
				res.code = "401";				
			}

			callback(null, res);
		});
	});	
}

exports.handle_request = handle_request;