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
	console.log('here');	
		coll.find({"item_id":msg.item_id}).toArray(function(err, data){
		
			if (data) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','selected item is found in items table!');
				res.code = "200";
				res.info = data;
			} else {
				logger.log('info','no items found in items table!');
				res.code = "401";
			}
			callback(null, res);
		});	
		
	});

};

exports.handle_request = handle_request;