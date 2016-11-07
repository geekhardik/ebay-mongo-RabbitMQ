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
			console.log("*************");
			console.log(msg);
			console.log("*************");
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

		//bidding code


		if(msg.price_option == "auction"){

			logger.log('info','item catogory is auction!');
			var millisec_time = 345600000;				//for 4 days!	
			var transection_id = uuid.v1();		
					setTimeout(function () {
						console.log("^^^^^^^^^^^^^ timeout!")
						// var query = "SELECT * from ebay.bids where price = (SELECT MAX(price) FROM ebay.bids)";
    					var winner;
    					var item_id;
    					var coll = mongo.collection('bids');
    					coll.find({"item_id" : msg.item_id},{sort:{"price":-1},limit:1},function(err, data){
    						if(data){
    						console.log("*******");
    						data.toArray(function(err,result){
    							
    							var JSON_query = {
    							"seller_id" : msg.seller_id,
								"item" : result[0].item,	
								"transection_id" : transection_id,
								"qty" : 1,
								"item_id" : result[0].item_id,
								"user_id" : result[0].user_id,
								"price" : result[0].price,
								"time" : Date()
								};

							
    							var coll = mongo.collection('order_details');

								coll.insert(JSON_query, function(err, results){
									if (results) {
									// This way subsequent requests will know the user is logged in.
									logger.log('info','inserted items into bought_detail database');
									// console.log("i : "+i+" "+count);
									
									//update qty in sell table
									new_qty = 1;
									item_id = result[0].item_id;

									
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

    						});	
    						console.log("*******");
    					}else{console.log("bidding falied!!!!!!!!!!!!!")};
					});	
					}, millisec_time);
		}

	});

};

exports.handle_request = handle_request;