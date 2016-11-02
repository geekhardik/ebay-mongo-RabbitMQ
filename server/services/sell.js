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
		var coll = mongo.collection('sell');
		
		

		coll.insert(msg, function(err, data){
		
			if (data) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','items were inserted in sell table successfully');
				res.code = "200";
			} else {
				logger.log('info','items could not be inserted in sell table');
				res.code = "401";
			}
			callback(null, res);
		});	
		
	});

};

exports.handle_request = handle_request;