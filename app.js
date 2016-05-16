'use strict';

const PORT = 3000;

var express = require('express');
var morgan = require('morgan');
var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var server = http.createServer(app);

var io = require('socket.io')(server);











server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});