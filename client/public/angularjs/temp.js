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


	/*mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('cart');
*/
		/*coll.find({"cart_id":cart_item.item_id,"user_id": req.session.user.user_id}).toArray(function(err, results){
			
			console.log(results.length);
			if (results.length > 0) {
				logger.log('info','Selected Item exists in cart already!');
				var current_qty = results[0].qty;
				var new_qty = Number(qty) + Number(current_qty);
				console.log('old qty'+current_qty);
				console.log('new qty'+new_qty);		

				var NEW_JSON_query = {
							"cart_id" : cart_item.item_id,
							"item" : cart_item.item,
							"qty" : new_qty,
							"user_id" : user,
							"seller_name" : cart_item.seller,
							"seller_id" : cart_item.seller_id,
							"price" : cart_item.price
						};

				//update qty into existing item

				coll.update({"cart_id":cart_item.item_id},NEW_JSON_query, function(err, results){
				
					if (results) {
						logger.log('info','selected quantity was updated into cart');
						res.send({success : 200});

					} else {
						logger.log('info','no items found in cart table!');
					}
					});

			} else {
				logger.log('info','no items found in cart table!');
				
				coll.insert(JSON_query, function(err, results){
				
					if (results) {
						logger.log('info','selected quantity was updated into cart');
						res.send({success : 200});

					} else {
						logger.log('info','no items found in cart table!');
					}
					}); */