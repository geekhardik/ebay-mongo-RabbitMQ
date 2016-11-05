var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/ebay";
var uuid = require('node-uuid');
var crypto = require('crypto');
var expressSession = require("express-session");
const winston = require('winston');
var logger = require('../logger/logger');


function handle_request(msg, callback){
	
	console.log('in handle result of checkout');
	var res = {};


	var size = 0,i=0,count=0,qty=0,cart_item= 0;
	var new_qty = 0;
	
	for (var x in msg){
		size++;
	}

	logger.log('info','In handle request of cart');
	var transection_id = uuid.v1();

	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	
	//delete the cart first!
	var coll = mongo.collection('cart');
	coll.remove({"user_id": msg[0].user_id}, function(err, results){
				if (results) {
					// This way subsequent requests will know the user is logged in.
					logger.log('info','deleted entries from cart database');

				} else{
					logger.log('info','entries could not be deleted from cart database after checkout!');
				}
	});	

		for (var i in msg){
			
				// var query = "INSERT INTO order_details SET ?";
				
				var JSON_query = {
						"seller_id" : msg[i].seller_id,
						"item" : msg[i].item,	
						"transection_id" : transection_id,
						"qty" : msg[i].qty,
						"item_id" : msg[i].cart_id,
						"user_id" : msg[i].user_id,
						"price" : msg[i].price,
						"time" : Date()
				};
				

				console.log(JSON_query);
				var coll = mongo.collection('order_details');

				coll.insert(JSON_query, function(err, results){
					if (results) {
					// This way subsequent requests will know the user is logged in.
					logger.log('info','inserted items into bought_detail for round'+i+' database');
					// console.log("i : "+i+" "+count);
					
					//update qty in sell table
					new_qty = msg[count].qty;
					item_id = msg[count++].cart_id;

					
					var coll = mongo.collection('sell');
					//update items in sell table
					coll.update({ "item_id": item_id},{ $inc: { "qty": -new_qty} }, function(err, results){
						if (results) {
							// This way subsequent requests will know the user is logged in.
							logger.log('info','items are updated from sell database');	
							res.code = "200";					
						} else {
							logger.log('info','counld not update records from sell table!');
							res.code = "401";
						}
						callback(null, res);
					});
					} else {
							logger.log('info','counld not insert records into order_details collection!');
							res.code = "401";
							callback(null, res);
						}						
			});

		};

	});
	

}; 

exports.handle_request = handle_request;