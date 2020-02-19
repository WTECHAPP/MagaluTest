var express       =  require('express');
var app           =  express();
var consign       =  require('consign');
consign({verbose: false}).include("boot.js").then("service").then("route").into(app);
module.exports = app;