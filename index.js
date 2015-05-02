require('shelljs/global');
var socket = require('socket.io-client')('http://localhost:8080');

socket.emit('add user');

socket.on('login', function(data) {
  console.log('Succesfully logged in as ' + data.username);
  console.log(data.numUsers + ' users are currently connected');
});

socket.on('play_url', function(data){
	console.log('play_url : ' + data.url);
	exec('mplayer -prefer-ipv4 "' + data.url +'"', {async:true});
});

socket.on('stop', function(data){
	console.log('stop');
	exec('killall mplayer');
});
