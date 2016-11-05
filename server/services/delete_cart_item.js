var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};

	logger.log('info','In handle request of delete_cart_item_queue');

	
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('cart');
	
			coll.remove({"user_id":msg.user_id, "item": msg.item}, function(err, results){
		
			if (results) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','Item deletion was successful');											
				res.code = "200";				
			} else {
				logger.log('info','Item deletion was failed');
				res.code = "401";
			}
			callback(null, res);
		});	
		
	});

};

exports.handle_request = handle_request;