var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.use(express.favicon());
app.use(express.logger('dev'));

// environment specific
if ('development' == app.get('env')) {
  console.log("Running app in dev mode!");
  app.set('views', __dirname + './../client/dev-build');
  app.use(express.static(path.join(__dirname, './../client/dev-build')));
  app.use(express.errorHandler());

} else {

  app.set('views', __dirname + './../client/deploy');
  app.use(express.static(path.join(__dirname, './../client/deploy')));

}

// continue all environments
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/words', function (req, res) {
  res.json({
    'test': true
  });
});

app.get('/words', function (req, res) {
  res.json({
    'test': true
  });
});

app.all('/*', function (req, res) {
  res.render('index.html');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
