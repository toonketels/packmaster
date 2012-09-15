var express =  require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , util = require('util');


app.use(express.bodyParser());

server.listen(3000, function() {
  console.log('Server is bound to port 3000');
});

app.post('/log', function (req, res) {
  console.log('posted to log');
  res.send(200);
  app.emit('postLog', req);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

  app.on('postLog', function(req) {
  	var result = JSON.parse(req.body.logentry);
    socket.emit('news', result);
  });

  //socket.emit('news', { hello: 'world' });
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
});


app.on('postLog', function(req) {
  console.log('postLog event emitted');
})