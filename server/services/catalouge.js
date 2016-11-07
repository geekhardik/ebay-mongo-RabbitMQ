var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};

	logger.log('info','In handle request of catalouge');

	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sell');
		console.log(msg.user);
		if(msg.user){

		coll.find({"seller_id":{$ne:msg.user.user_id}}).toArray(function(err, data){
		
			if (data.length >0) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','cataLouge retrival was successful'); 
				res.code = "200";
				res.info = data;	
				

			} else {
				logger.log('info','cataLouge is empty');
				res.code = "401";
			}
			callback(null, res);
		});
	
	
	}else{
			console.log("we have reached!");
			coll.find({}).toArray(function(err, data){
			if (data.length >0) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','cataLouge retrival was successful'); 
				res.code = "200";
				res.info = data;		

			} else {
				logger.log('info','cataLouge is empty');
				res.code = "401";
				res.info = "null";
			}
			callback(null, res);
			
		});
	}	
	// console.log(res.info);
	
	});
}

exports.handle_request = handle_request;