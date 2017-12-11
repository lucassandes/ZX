var express = require('express');
var app = express();

app.use(express.static('./www'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/www/index.html");
});

app.listen(8081, function(){
    console.log("Server runnning...");
    console.log("Port 8081");
    console.log("http://localhost:8081");
});