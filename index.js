require('shelljs/global');
var socket = require('socket.io-client')('http://test.ruffilli.it:8888');

socket.emit('add user');

socket.on('login', function(data) {
  console.log("Succesfully logged in as " + data.username);
  console.log(data.numUsers + ' users are currently connected');
});

socket.on('play_url', function(data){
	console.log('play_url : ' + data.url);
	exec("mplayer -prefer-ipv4 " + data.url);
});

