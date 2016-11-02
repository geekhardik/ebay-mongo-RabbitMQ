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



/*
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('sell');
	
	coll.findOne(msg, function(err,results){
			if (results) {
				logger.log('info','user information retrival is successful');
				res.info = results;
				res.code = "200";
			} else {
				logger.log('info','user information query was failed');
				res.code = "401";	
				res.info = "null";			
			}
			callback(null, res);
		});
	});	*/
}

exports.handle_request = handle_request;