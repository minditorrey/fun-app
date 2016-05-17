'use strict';

var socket, player, cardValue;

$(() => {

	socket = io();

	socket.on('playerNum', playerNum => {
		player = playerNum;
		$('#status').text("Waiting for opponent.");


	});

	socket.on('gameStart', () => {
		if(player) {
			$('#dealButtons').show();
			$('#status').text('Highest cards wins!');
		}		
	});

	$('button.dealBtn').on('click', dealCard);

});


function dealCard(e) {
	$('.dealBtn').off('click');
	$(e.target).addClass('active');

	randomCard(player);
	var cardValue;
	if (player === 1){
		cardOneValue = $('#p1').text();
		console.log(cardOneValue);
		
	} else if (player === 2) {
		cardTwoValue = $('#p2').text();
		console.log(cardTwoValue);
	}
		// socket.emit('cardValue', {playerOne: cardOneValue, playerTwo: cardTwoValue });
	
	

}

function randomCard(playerNum) {

	var f = Math.floor(Math.random() * 11);

	if (playerNum === 1){
		$('#p1').text(f);
	} else if (playerNum === 2) {
		$('#p2').text(f);
	}

}

