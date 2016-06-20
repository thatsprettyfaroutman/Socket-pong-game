var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
	// process HTTP request. Since we're writing just WebSockets server
	// we don't have to implement anything.
});
server.listen(1337, function() { });



// create the server
wsServer = new WebSocketServer({
	httpServer: server
});


var
	display = null,
	playerA = null,
	playerB = null,
	currentIndex = 0; // CONNECT DISPLAY FIRST


// WebSocket server
wsServer.on('request', function(request) {
	var
		connection = request.accept(null, request.origin);


	// This is the most important callback for us, we'll handle
	// all messages from users here.
	connection.on('message', function(message) {
		var
			data, d;

		if (message.type === 'utf8') {
			data = message.utf8Data;
			d = data.split('|');

			switch (d[0]) {
				case 'display':
					console.log('ok ur main client aka display aka game');
					display = connection;
					break;

				case 'j': //player join: j
					console.log('New player joining');
					if (currentIndex == 0) {
						if (playerA != null) {
							playerA.close('kicked');
						}
						playerA = connection;
					} else {
						if (playerB != null && playerA != display) {
							playerB.close('kicked');
						}
						playerB = connection;
					}

					connection.send(['id', currentIndex].join('|'));

					currentIndex++;
					if (currentIndex == 2) {
						currentIndex = 0;
					}
					break;

				case 'm': // Player move: m, id, pos
					// console.log(d[1], d[2], display != null);
					if (display != null) {
						display.send(['pm', d[1], d[2]].join('|'));
					}
					break;
			}

		}
	});

	connection.on('close', function(connection) {
		// close user connection
		console.log('player left');
		// currentIndex--;
	});
});
