var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var zcomm = require('./zcomm').create()

app.use(express.static("public"));

zcomm.subscribe('ALL', function(channel, data) {
    var msg = {channel: channel.toString(), data: data.toString()};
    io.emit('server-to-client', msg);
});

io.on('connection', function(socket){
    socket.on('client-to-server', function(data){
        zcomm.publish('foo', data);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});