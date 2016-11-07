var expect = require('chai').expect;

var request = require('request');

describe ('ebay_test',function(){

	it('validate signin',function(done){

		request({
			url : "http://localhost:3000/afterSignIn",
			method : "POST",
			json : true,
			body : {
				"username" : "hardik",
				"password" : "123"
			}
		},function(err,req,body){
			console.log(body.statusCode);
			expect(body.statusCode).to.equal(200);
			done();
		});
	});

	it('validate signin',function(done){

		request({
			url : "http://localhost:3000/afterSignIn",
			method : "POST",
			json : true,
			body : {
				"username" : "shim",
				"password" : "shim"
			}
		},function(err,req,body){
			console.log(body.statusCode);
			expect(body.statusCode).to.equal(200);
			done();
		});
	});
	
	it('validate signin',function(done){

		request({
			url : "http://localhost:3000/afterSignIn",
			method : "POST",
			json : true,
			body : {
				"username" : "wow",
				"password" : "wow"
			}
		},function(err,req,body){
			console.log(body.statusCode);
			expect(body.statusCode).to.equal(200);
			done();
		});
	});
	it('invalidate signin',function(done){

		request({
			url : "http://localhost:3000/afterSignIn",
			method : "POST",
			json : true,
			body : {
				"username" : "h",
				"password" : "hardik"
			}
		},function(err,req,body){
			expect(body.statusCode).to.equal(401);
			done();
		});
	});
	
		
	it('validate checkout',function(done){

		request({
			url : "http://localhost:3000/gotoCheckout",
			method : "POST",
			json : true,
			/*body : {
				
			}*/
		},function(err,req,body){
			expect(body.success).to.equal(200);
			done();
		});
	});
	
	/*it('validate signup',function(done){

		request({
			url : "http://localhost:3000/signup_scccess",
			method : "POST",
			json : true,
			body : {
				"firstname" : "hardik",
				"lastname" : "s",
				"username" : "nil",
				"password" : "hi",
				"contact" : "456123789",
				"location" : "san jose"
			}

		},function(err,req,body){
			expect(body.statusCode).to.equal(200);
			done();
		});
	});*/
	
	
	
	

});