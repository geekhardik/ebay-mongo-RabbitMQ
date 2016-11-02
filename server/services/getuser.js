var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};
	logger.log('info','In handle request of getuser');
	
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('users');
	
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
	});	
}

exports.handle_request = handle_request;