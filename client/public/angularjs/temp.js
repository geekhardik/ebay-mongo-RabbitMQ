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
				console.log("valid Login");
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				req.session.user = {
					"user_id" : results.user_id,
					"username" : username
				};
				console.log(req.session.user);
				res.send({"statusCode" : 200});
			}
			else {    
				
				logger.log('info','signin was failed');
				res.send({"statusCode" : 401});
			}
		}  
	});