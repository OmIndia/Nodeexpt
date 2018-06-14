var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
module.exports = app;

app.get("/", (req, res) => {

    res.send({ hello: "world" });

});

app.post('/test', (request, response) => {
   console.log(request.body);
});

app.listen(port, function() {
    console.log('Our app is running on Heroku' + port);
});