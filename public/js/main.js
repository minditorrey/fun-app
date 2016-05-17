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
	var cardOneValue;
	var cardTwoValue;
	if (player === 1){
		cardOneValue = $('#p1').text();


	} else if (player === 2) {
		cardTwoValue = $('#p2').text();
	}

	socket.emit('cardValue', {playerOne: cardOneValue, playerTwo: cardTwoValue });

	socket.on('compare', compare => {
		// console.log('FE otherCards:', otherCards);

		for(var i=0; i < compare.length; i++) {

			if(compare[i].playerOne) {
				$('#p1').text(compare[i].playerOne);
				// console.log('compare[i].playerOne:', compare[i].playerOne);

			} else if(compare[i].playerTwo) {
				$('#p2').text(compare[i].playerTwo);
				// console.log('compare[i].playerTwo:', compare[i].playerTwo);
			}
		}

		socket.on('winner', winner => {
			$('#status').text(`The winner is ${winner}`);
		})

	})
}

function randomCard(playerNum) {

	var f = Math.floor(Math.random() * 11);
	console.log('f', f);
	if (playerNum === 1){

		$('#p1').text(f);

	} else if (playerNum === 2) {

		$('#p2').text(f);
	}

}
