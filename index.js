// Absolute path of the noizes service
const serviceUrl = 'http://localhost:8888';

// Used to escape shell commands
var shellescape = require('shell-escape');

// Used to invoke shell commands
require('shelljs/global');

// Create a socket client istance with serviceUrl
var socket = require('socket.io-client')(serviceUrl);

// First thing, login to the service
socket.emit('add user');

socket.on('login', function(data) {
  console.log('Succesfully logged in as ' + data.username);
  console.log(data.numUsers + ' users are currently connected');
});

// Invoke mplayer when receiving the play_url command
socket.on('play_url', function(data) {
  console.log('play_url : ' + data.url);

  var mplayerCMD = ['mplayer', '-prefer-ipv4', data.url];

  console.log('Running command ' + shellescape(mplayerCMD))

  exec(shellescape(mplayerCMD) + '>/dev/null 2>&1', {
    async: true
  });
});

// Killall mplayer istances (YOLO) when receiving the stop command
socket.on('stop', function(data) {
  var killallCMD = 'killall mplayer';
  console.log('stop');
  console.log('Running command ' + killallCMD)
  exec(killallCMD);
});