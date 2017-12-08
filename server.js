var express = require('express');
var app = express();

app.use(express.static('./www'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/www/index.html");
});

app.listen(8081, function(){
    console.log("Server runnning... port: 8081");
})