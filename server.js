//Om - works Jun 14 2018 19:19 pm
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var url = require ('url');
var mysql = require('mysql');


var db_url = url.parse(process.env.CLEARDB_DATABASE_URL);
var myuser = db_url.auth.substr(0, db_url.auth.indexOf(':'));
var mypass = db_url.auth.substr(db_url.auth.indexOf(':') + 1, db_url.auth.length);
var myhost = db_url.host;
var mydb = db_url.path;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
module.exports = app;

var conn = mysql.createConnection({
  host: myhost,
  user: myuser,
  password: mypass,
  database: mydb
});

app.get("/", (req, res) => {

    res.send({ hello: "world" });

});

app.post('/test', (request, response) => {
   console.log(request.body);
   console.log(myuser);
   console.log(mypass);
   console.log(myhost);
   console.log(mydb);
   conn.connect(function(err) {
   if (err) throw err
   console.log('You are now connected to MySQL database...');
   });
   var stmt = "INSERT INTO ecgdata (id, timestamp, value) VALUES (req.id, req.timestamp, req.value)";
  conn.query(stmt, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

app.listen(port, function() {
    console.log('Our app is running on Heroku' + port);
});