//Om - works Jun 14 2018 19:19 pm
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var url = require ('url');
//var parseDbUrl = require("parse-database-url");
var mysql = require('mysql');


var db_url = url.parse(process.env.CLEARDB_DATABASE_URL);
var myuser = db_url.auth.substr(0, db_url.auth.indexOf(':'));
var mypass = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length);
var myhost = db_url.host;
var mydb = db_url.pathname.substr(1,db_url.pathname.length);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
module.exports = app;


var conn = mysql.createConnection({
  host: myhost,
  user: myuser,
  password: mypass,
  database: mydb
});

conn.connect(function(err) {
   if (err) {
    console.error('error connecting to MySQL database: ' + err.stack);
    return;
	}
   console.log('You are now connected to MySQL database...');
   });
   
app.get("/", (req, res) => {

    res.send({ hello: "world" });

});

app.post('/test', (request, response) => {
   console.log(request.body);
   var obj = JSON.stringify(request.body);
   /*console.log("JSON stringify is ",obj);
   console.log("User is",myuser);
   console.log("Password is",mypass);
   console.log("Host is",myhost);
   console.log("Database is",mydb);
   console.log(typeof obj.id);
   */
   var obj1 = JSON.parse(obj);
   var patid = parseInt(obj1.id);
   var ts = parseInt(obj1.timestamp);
   var val = parseInt(obj1.value);
   /*console.log(typeof patid);
   console.log("Id is ", patid);
   console.log("Timestamp is ", ts);
   console.log("Value is ", val);
   */
   

   //var stmt = "INSERT INTO `ecgdata` (`patid`, `timestamp`, `value`) VALUES(patid,ts,val)";
   //console.log("stmt is",stmt);
   var stmt = "INSERT INTO `ecgdata` (`patid`, `timestamp`, `value`) VALUES("+patid+","+ts+","+val+")";
   console.log("stmt is",stmt);
  conn.query(stmt, function (err, result) {
	//var params = [id,ts,val];
	//conn.query('INSERT INTO `ecgdata` (`id`, `timestamp`, `value`) VALUES(id,ts,val,1)', function (err, result) {
    if (err) {
    console.error('error inserting: ' + err.stack);
	conn.end() (function(err) {
	  if (err) {
    console.error('error closing connection: ' + err.stack);
    return;
	}
     console.log("Connection is ended");// The connection is terminated now
     });
    return;
	}
    console.log("1 record inserted");
    });
	
	
  });
  
app.listen(port, function() {
    console.log('Our app is running on Heroku' + port);
});