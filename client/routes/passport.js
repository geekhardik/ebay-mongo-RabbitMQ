
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
// var mongo = require('./mongo');
// var loginDatabase = "mongodb://localhost:27017/ebay";
var mq_client = require('../rpc/client');

module.exports = function(passport) {
    console.log("first here!");
    passport.use('login', new LocalStrategy(function(username, password, done) {
         // console.log("second here!");
      
        process.nextTick(function(){
         var msg_payload = { "username": username, "password": password };
                mq_client.make_request('login_queue',msg_payload, function(err,user){
                    done(null, user);                                         
                             
                });    
            });      
    }));
}


