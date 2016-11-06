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

