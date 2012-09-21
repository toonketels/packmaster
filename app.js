var express =  require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , util = require('util')
  , path = require('path');

/**
 * Configure app/use middleware.
 */
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, function() {
  console.log('Server is bound to port 3000');
});

app.post('/log', function (req, res) {
  console.log('posted to log');
  res.send(200);
  app.emit('postLog', req);
});



/**
 * Socket connection...
 */
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