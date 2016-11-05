//super simple rpc server example
var amqp = require('amqp')
, util = require('util');


var mongo = require("./services/mongo");
var mongoSessionConnectURL = "mongodb://localhost:27017/ebay";

var login = require('./services/login');
var signup = require('./services/signup');
var getuser = require('./services/getuser');
var catalouge = require('./services/catalouge');
var sell = require('./services/sell');
var logintime = require('./services/logintime');
var item = require('./services/item');
var getcart = require('./services/getcart');
var cart = require('./services/cart');
var checkout = require('./services/checkout');
var getbought = require('./services/getbought');
var getsold = require('./services/getsold');
var delete_cart_item = require('./services/delete_cart_item');
var bid = require('./services/bid');


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

cnn.on('ready', function(){
	console.log("listening on getuser_queue");
	cnn.queue('getuser_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			getuser.handle_request(message, function(err,res){
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

cnn.on('ready', function(){
	console.log("listening on catalouge_queue");
	cnn.queue('catalouge_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			catalouge.handle_request(message, function(err,res){
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

cnn.on('ready', function(){
	console.log("listening on sell_queue");
	cnn.queue('sell_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			sell.handle_request(message, function(err,res){
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

cnn.on('ready', function(){
	console.log("listening on logintime_queue");
	cnn.queue('logintime_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			logintime.handle_request(message, function(err,res){
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

cnn.on('ready', function(){
	console.log("listening on item_queue");
	cnn.queue('item_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			item.handle_request(message, function(err,res){
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

cnn.on('ready', function(){
	console.log("listening on getcart_queue");
	cnn.queue('getcart_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			getcart.handle_request(message, function(err,res){
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

cnn.on('ready', function(){
	console.log("listening on cart_queue");
	cnn.queue('cart_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			cart.handle_request(message, function(err,res){
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


	console.log("listening on checkout_queue");
	cnn.queue('checkout_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			checkout.handle_request(message, function(err,res){
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

	console.log("listening on getbought_queue");
	cnn.queue('getbought_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			getbought.handle_request(message, function(err,res){
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

	console.log("listening on getsold_queue");
	cnn.queue('getsold_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			getsold.handle_request(message, function(err,res){
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

	console.log("listening on delete_cart_item_queue");
	cnn.queue('delete_cart_item_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			delete_cart_item.handle_request(message, function(err,res){
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

	console.log("listening on bid_queue");
	cnn.queue('bid_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			bid.handle_request(message, function(err,res){
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

