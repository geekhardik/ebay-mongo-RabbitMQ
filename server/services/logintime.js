var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};

	logger.log('info','In handle request of sell');


			mongo.connect(mongoURL, function(){
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('last_login');
			coll.findOne({"user_id": msg.user_id}, function(err, log_in){
				if(log_in){

					//update the time!

					coll.update({"user_id" : msg.user_id},{$set:{"last_visited" : Date()}}, function(err, results){
						if (results) {
							logger.log('info','updated last_loggedin time as');										
						} else {
							logger.log('info','could not update last visited time');
						}
					});

					res	.code = "200";				
					res.last_visited = log_in.last_visited;
				}else {
					logger.log('info','could not update last visited time');
					res.code = "401";
			}
			callback(null, res);
			});	
		});

	
/*	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('last_login');
		
		

		coll.update({"user_id" : msg.user_id},{$set:{"last_visited" : Date()}}, function(err, results){
		
			if (results) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','updated last_loggedin time as');	
				res	.code = "200";
				
				res.last_visited = results.last_visited;
			} else {
				logger.log('info','could not update last visited time');
				res.code = "401";
			}
			console.log(res.last_visited);
			callback(null, res);
		});	
		
	});*/

};

exports.handle_request = handle_request;