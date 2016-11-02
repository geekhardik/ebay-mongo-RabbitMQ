//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var login = require('./services/login');

var signup = require('./services/signup');

var mongo = require("./services/mongo");
var mongoSessionConnectURL = "mongodb://localhost:27017/ebay";



var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('login_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			login.handle_request(message, function(err,res){
				console.log("sending response of server is : "+ res);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentEncoding:'utf-8',
					contentType:'application/json',
					correlationId:m.correlationId
				});
			});
		});
	});
});


//for signup queue

cnn.on('ready', function(){
	console.log("listening on signup_queue");
	cnn.queue('signup_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			signup.handle_request(message, function(err,res){
				console.log("sending response of server is : "+ res.code);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentEncoding:'utf-8',
					contentType:'application/json',
					correlationId:m.correlationId
				});
			});
		});
	});
});