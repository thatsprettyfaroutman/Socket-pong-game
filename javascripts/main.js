$(function () {
	"use strict";

	var
		moveStart = 0,
		w = $(window).width(),
		h = $(window).height(),
		fh = $('.field').height(),
		ph = $('.paddle').first().height(),
		id = -1,
		mx = $(window).width() / 1920, // multiplier X
		my = $(window).height() / 1080, // multiplier Y

		bounds = { 
			left : w * 0.07 + 7.5,
			right : w * 0.93 - 7.5
		},

		pleft = {
			paddleDom : $('.player-a').first(),
			scoreDom : $('.player-a-score').first(),
			score : 0,
			y : parseInt($('.player-a').first().css('top'))
		},
		pright = {
			paddleDom : $('.player-b').first(),
			scoreDom : $('.player-b-score').first(),
			score : 0,
			y : parseInt($('.player-b').first().css('top'))
		},

		// playerA = $('.player-a').first(),
		// playerB = $('.player-b').first(),
		// playerAScore = $('.player-a-score').first(),
		// playerBScore = $('.player-b-score').first(),
		// scoreA = 0,
		// scoreB = 0,
		ball = $('.ball').first();

	// window.addEventListener('deviceorientation', function(event) {
	// 	var alpha = event.alpha;
	// 	var beta = event.beta;
	// 	var gamma = event.gamma;
	// 	// document.getElementById("alpha").innerHTML = alpha;
	// 	document.getElementById("beta").innerHTML = beta;
	// 	// document.getElementById("gamma").innerHTML = gamma;
	// }, false);



	$(window).resize( function  () {
		h = $(window).height();
		w = $(window).width();
		fh = $('.field').height();
		ph = $('.paddle').first().height();
		mx = $(window).width() / 1920; // multiplier X
		my = $(window).height() / 1080; // multiplier Y
		bounds = { 
			left : w * 0.07 + 7.5,
			right : w * 0.93 - 7.5
		};
	});

	function touchStart (e) {
		moveStart = e.originalEvent.touches[0].clientY;
		$(window).on('touchmove', touchMove);
		$(window).on('touchend', touchEnd);
		return false;
	}

	function touchMove (e) {
		curPos = (e.originalEvent.touches[0].clientY - 100) / (h - 200);

		// sendPos(pos);

		return false;
		// console.log((e.originalEvent.touches[0].clientY - 100) / (h - 200));
		// document.getElementById("gamma").innerHTML = ((e.originalEvent.touches[0].clientY - 100) / (h - 200));
	}

	function touchEnd (e) {
		$(window).off('touchmove', touchMove);
		$(window).off('touchend', touchEnd);
		return false;
		// document.getElementById("gamma").innerHTML = 'stoppdd';
	}

	$(window).on('touchstart', touchStart);
	// console.log(window);


	var 
		curPos = 0,
		lastPos = 0;

	function sendPos () {
		if (id != -1 && curPos != lastPos) {
			connection.send(['m', id, curPos].join('|'));
			lastPos = curPos;
		}
	}

	if (!_display) {
		setInterval(sendPos, 50);
	}







	// if user is running mozilla then use it's built-in WebSocket
	window.WebSocket = window.WebSocket || window.MozWebSocket;

	var connection = new WebSocket('ws://192.168.1.38:1337');
	// var connection = new WebSocket('ws://pi/game/:1337');

	connection.onopen = function () {
		// connection is opened and ready to use
		console.log('Joining');

		if (_display === true) {
			connection.send('display');
		} else {
			connection.send('j');
		}
	};

	connection.onerror = function (error) {
		// an error occurred when sending/receiving data
	};

	connection.onmessage = function (message) {
		var 
			data = message.data,
			d = data.split('|'),
			pid = -1,
			paddle = null,
			y;

		// console.log(data);
		// $('#data').html(data);

		switch (d[0]) {
			case 'id': // My new id
				id = parseInt(d[1]);
				console.log(id % 2 == 0 ? 'PLAYER A' : 'PLAYER B');
				$('.status').html(id % 2 == 0 ? 'Left Paddle' : 'Right Paddle');
				break;

			case 'pm': // Player move (DISPLAY)
				y = parseFloat(d[2]);
				pid = parseInt(d[1]);
				paddle = pid % 2 == 0 ? pleft : pright;
				paddle.y = y * (fh - ph);
				TweenMax.to(paddle.paddleDom, 0.1, {
					top : paddle.y
				});
				// paddle.paddleDom.css('top', paddle.y);
				break;
		}

		connection.onclose = function (message) {
			console.log('onClosee?? kicked??');
			$('.status').html('Disconnected');
			id = -1; // AKA disconnected lol
		}

		// try to decode json (I assume that each message from server is json)
		// try {
		// 	var json = JSON.parse(message.data);
		// } catch (e) {
		// 	console.log('This doesn\'t look like a valid JSON: ', message.data);
		// 	return;
		// }
		// handle incoming message
		
	};


	if (!_display) {
		return false;
	}

	var
		ballCount = 1,
		ballx, // = ball.offset().left + 7.5,
		bally, // = ball.offset().top - 7.5,
		ballvx, // = 5 * mx * (ballCount % 2 == 0 ? -1 : 1),
		ballvy; // = 5 * my;


	// ZE BALL ANIMATIONS
	var requestAnimFrame = (function () {
		return	window.requestAnimationFrame       ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame    ||
						function( callback ) {
						  window.setTimeout(callback, 1000 / 30);
						};
	})();

	function animLoop () {
		var
			nx = ballx, ny = bally;
		requestAnimFrame(animLoop);

		nx += ballvx;
		ny += ballvy;

		ball
			.css('top', ny)
			.css('left', nx);

		ballx = nx;
		bally = ny;

		if (bally <= 7.5) {
			ballvy *= -1;
		} else if (bally > fh - 7.5) {
			ballvy *= -1;
		}

		if (ballvx > 0) { // Going right
			if (ballx > bounds.right && ballx < bounds.right + 20) {
				if (bally > pright.y && bally < pright.y + ph) {
					ballvx *= -1.1;
					// ballvy *= Math.random() * 2 - 0.5;
				}
			}
		} else { // Going left
			if (ballx < bounds.left && ballx > bounds.left - 20) {
				if (bally > pleft.y && bally < pleft.y + ph) {
					ballvx *= -1.1;
					// ballvy *= Math.random() * 2 - 0.5;
				}
			}
		}


		if (ballx < 0) {
			console.log('Right scored');
			pright.score++;
			pright.scoreDom.html(pright.score);
			if (pright.score == 5) {
				resetGame('Right Wins');
			} else {
				resetBall();
			}
		} else if (ballx > w) {
			console.log('Left scored');
			pleft.score++;
			pleft.scoreDom.html(pleft.score);
			if (pleft.score == 5) {
				resetGame('Left Wins');
			} else {
				resetBall();
			}
		}

	};

	animLoop();

	function resetGame (winText) {
		console.log('reset game');
		ballvx = 0;
		ballvy = 0;
		ballx = w / 2;
		bally = fh / 2;

		pleft.score = 0;
		pright.score = 0;

		pleft.scoreDom.html(0);
		pright.scoreDom.html(0);
		
		$('.status').first().html(winText);

		setTimeout(function () {
			resetBall(3);
		}, 3000);
	}

	function resetBall (seconds) {
		console.log('reset ball');

		if (typeof seconds === 'undefined') {
			seconds = 2;
		}

		ballCount++;
		ballx = w / 2;
		bally = fh / 2;

		ballvx = 0;
		ballvy = 0;

		setTimeout( function () {
			ballvx = (Math.random() * 5 + 5) * mx * (ballCount % 2 == 0 ? -1 : 1);
			ballvy = (Math.random() * 30 - 15) * my;
		}, seconds * 1000);

		countDown(seconds);
	}

	function countDown(seconds) {

		if (seconds == 0) {
			$('.status').first().empty();
			return false;
		}

		$('.status').first().html(seconds);

		setTimeout(function () {
			countDown(seconds - 1);
		}, 1000);
	}


	resetBall(5);

});
