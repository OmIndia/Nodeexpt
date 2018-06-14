const express = require("express");

const app = express();

var port = process.env.PORT || 8080;

app.get("/", (req, res) => {

    res.send({ hello: "world" });

});

app.listen(port, function() {
    console.log('Our app is running on Heroku' + port);
});

