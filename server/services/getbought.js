var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};

	logger.log('info','In handle request of getbought');

	
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('order_details');
	
		coll.find({"user_id" : msg.user_id}).toArray(function(err, results){
		
			if (results.length > 0) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','purchase history retrival is successful');
				res.code = "200";
				res.info = results;
			} else {
				logger.log('info','bought history query was failed');
				res.code = "401";
			}
			callback(null, res);
		});	
		
	});

};

exports.handle_request = handle_request;