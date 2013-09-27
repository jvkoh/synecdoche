var express = require('express'),
    ejs = require('ejs'),
    device  = require('express-device');
var app = express();

app.configure(function(){
    app.set('view engine', 'ejs');
    app.set('view options', { layout: false });
    app.set('views', __dirname + '/views');

    app.use(express.bodyParser());
    app.use(device.capture());

    app.enableViewRouting();

    app.use(express.static(__dirname + '/public/'));
});

/*========= ROUTING ==========*/
app.get('/', function(req, res){
    res.render('index.ejs');
});


app.listen(3000);
