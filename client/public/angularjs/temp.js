mq_client.make_request('signup_queue',JSON_query, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid signup");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			}
			else {    
				
				console.log("signup was not successful");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});	


var msg_payload = { "username": username, "password": password };
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid signup");
				res.send({"statusCode" : 200});
			}
			else {    
				
				logger.log('info','signin was failed');
				res.send({"statusCode" : 401});
			}
		}  
	});


/*
 * Created by Vedang Jadhav on 4/16/16.
 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// var mongo = require('./db/mongo');
var mongo = require("./mongo");
var loginDatabase = "mongodb://localhost:27017/ebay";
var mq_client = require('../rpc/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {

        process.nextTick(function(){

                var msg_payload = { "username": username, "password": password };
                mq_client.make_request('login_queue',msg_payload, function(err,user){
                    console.log(user.code);
                    // done(null, user);       

                    if(err){
                        return done(err);
                    }

                    if (user.code == 401) {
                        console.log("Inside");
                        return done(null, false);
                    }
                    if(user.code == 200){                            
                            // res.send({"statusCode" : 200});
                         
                            console.log("wow!!!")
                            // console.log(user);
                            done(null, user);
                            connection.close();
    
                    }             
                });                
            });      
    }));
}





if(msg.price_option == "auction"){
					logger.log('info','item catogory is auction!');
					
					var millisec_time = 120000;				//for 4 days!	
					
					setTimeout(function () {
						logger.log('info','Bid is expired and now automatic function will perfrom the task to announce winner!'); 

    				
    				//get the highest bidder 

    				var query = "SELECT * from ebay.bids where price = (SELECT MAX(price) FROM ebay.bids)";
    				var winner;
    				var item_id;
						
						mysql.fetchData(function(err, results) {
							if (err) {
								throw err;
							} else {
								if (results.length > 0) {
									logger.log('info','selected highest bidder from bids databases');
									console.log(results);
									var winner = results[0].user_id;
									var item_id = results[0].item_id;
									console.log(winner);	
									console.log(item_id);

			    					var transection_id = uuid.v1();
			    					//update transection table

			    					var query = "INSERT INTO transection SET ?";
						
									var JSON_query = {
											"total" : req.body.price,
											"user_id" : winner ,	
											"id" : transection_id
									};
									
									mysql.fetchData(function(err, results) {
										if (err) {
											throw err;
										} else {
											if (results.affectedRows === 1) {
												logger.log('info','winner of bid transection table is updated');	
												
												//update order_details table

												var query = "INSERT INTO order_details SET ?";
												
												var JSON_query = {
														"seller_id" : req.session.user.user_id,
														"item" : req.body.item,	
														"transection_id" : transection_id,
														"qty" : 1					
												};
												
												mysql.fetchData(function(err, results) {
													if (err) {
														throw err;
													} else {
														if (results.affectedRows === 1) {
															
															logger.log('info','inserted items into order_details database');				
															
															//update qty in sell table
															
															var query = "delete from sell where item_id = '"+item_id+"' AND price_option = 'auction' AND seller_id = '"+req.session.user.user_id+"'";
															
															mysql.fetchData(function(err, results) {
																if (err) {
																	throw err;
																} else {
																	if (results.affectedRows === 1) {							
																		logger.log('info','deleted items from sell database');									
																			
																		//update bids qty as well!..

																		var query = "delete from bids where item_id = '"+item_id+"'";
																					
																					mysql.fetchData(function(err, results) {
																						if (err) {
																							throw err;
																						} else {
																							if (results.length > 0) {							
																								logger.log('info','deleted items from bids database');									
																																		
																							} else{
																								logger.log('info','counld not delete records from sell table!');
																							}
																						}
																					}, query); 
																	} else{
																		logger.log('info','counld not delete records from sell table!');
																	}
																}
															}, query); 
														} 
													}
												}, query,JSON_query); 	
											}else{
												logger.log('info','No bidders for this item!');
											} 
										}
									}, query,JSON_query); 												
											} 
										}
									}, query,JSON_query); 					

					}, millisec_time)}; 
				
				
				var json_responses = {
					"statusCode" : 200
				};
				res.send(json_responses);
			} else {
				logger.log('info','items could not be inserted in sell table');
				 json_responses = {
					"statusCode" : 401
				};
				res.send(json_responses);
			}
		}
	}, query_string, JSON_query);
	
	})}; */