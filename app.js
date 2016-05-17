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

var userCount = 0;
var compare =[];


io.on('connection', function(socket) {
	userCount++;
 

  if(userCount === 1 || userCount === 2) {
    socket.emit('playerNum', userCount);
  }

  if(userCount === 2) {
    io.emit('gameStart', null);
  }



socket.on('cardValue', cardValue => {
	compare.push(cardValue);

	io.emit('compare', compare);

	///have array w/ 2 objects

	var result = null;
	
	var winner;
	for (var i = 0; i < compare.length; i++) { 
  		// if (compare[i].name === "string 1") { 
    // 		result = array[i];
    // 	break;
  		// } 
  			var cardOne;
  			var cardTwo;
			if(compare[i].playerOne) {
				cardOne = compare[i].playerOne;
				// $('#p1').text(compare[i].playerOne);
				// console.log('compare[i].playerOne:', compare[i].playerOne);
				
			} else if(compare[i].playerTwo) {
				cardTwo = compare[i].playerTwo;
				// $('#p2').text(compare[i].playerTwo);
				// console.log('compare[i].playerTwo:', compare[i].playerTwo);
			}

			if ( parseInt(cardOne) > parseInt(cardTwo) ) {
				winner = 'playerOne';	
			} else {
				winner = 'playerTwo';
			}

	}


	///take the value from each object
	///get largest
	///send back winner is player with largest

	io.emit('winner', winner);


})	


});








server.listen(PORT, err => {
  console.log(err || `Server listening on port ${PORT}`);
});