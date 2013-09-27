var express = require('express');
var app = express();
var device = require('express-device');
var ejs = require('ejs');

app.configure(function(){
    app.set('view engine', 'ejs');
    app.set('view options', { layout: false });
    app.set('views', __dirname + '/views');

    app.use(express.bodyParser());
    app.use(device.capture());

    app.use(express.static(__dirname + '/public/'));
});

/*========= ROUTING ==========*/
app.get('/', function(req, res){
    res.render('index.ejs');
});


app.listen(3000);
