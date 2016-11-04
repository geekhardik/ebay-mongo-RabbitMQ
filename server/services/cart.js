var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	var res = {};

	logger.log('info','In handle request of cart');

	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('cart');
	
	
	coll.find({"cart_id":msg.cart_id,"user_id": msg.user_id}).toArray(function(err, results){
			
			if (results.length > 0) {
				logger.log('info','Selected Item exists in cart already!');
				var current_qty = results[0].qty;
				var new_qty = Number(msg.qty) + Number(current_qty);
				console.log('old qty'+current_qty);
				console.log('new qty'+new_qty);		

				var NEW_JSON_query = {
							"cart_id" : msg.cart_id,
							"item" : msg.item,
							"qty" : new_qty,
							"user_id" : msg.user_id,
							"seller_name" : msg.seller_name,
							"seller_id" : msg.seller_id,
							"price" : msg.price
						};

				//update qty into existing item

				coll.update({"cart_id":msg.cart_id},NEW_JSON_query, function(err, results){
				
					if (results) {
						logger.log('info','selected quantity was updated into cart');
						res.code = "200";
						res.info = "selected quantity was updated into cart";

					} else {
						logger.log('info','no items found in cart table!');
						res.code = "401";
						res.info = "no items found in cart table!";
					}
					callback(null, res);
					});

			} else {
				logger.log('info','no items found in cart table!');
				
				coll.insert(msg, function(err, results){
				
					if (results) {
						logger.log('info','selected quantity was inserted into cart');
						res.code = "200";
						res.info = "selected quantity was inserted into cart";

					} else {
						logger.log('info','selected quantity was not inserted into cart');
						res.code = "200";
						res.info = "selected quantity was not inserted into cart";
					}
					callback(null, res);
					});
			}
		});

	



		coll.find({"user_id" : msg.user_id}).toArray(function(err, data){
		
			if (data) {
				// This way subsequent requests will know the user is logged in.
				logger.log('info','getcart retrival is successful');
				res.code = "200";
				res.info = data;
			} else {
				logger.log('info','getcart query was failed');
				res.code = "401";
			}
			callback(null, res);
		});	
		
	});

}; 

exports.handle_request = handle_request;