### Crappy socket based pong game demo

#### Installation
* `git clone`
* `npm install`
* Change the line 116 in `javascripts/main.js` to match your server (will maybe fix this later)

#### Running
* `node node/server.js` (server, sockets)
* `live-server` (clients use this for now)

#### Playing
The game is pong.

You need 3 browsers or devices to play.
1 for displaying the field. 2 for controlling the paddles.

First device should be the display. This could be the machine thats running the servers for example. Connect it to `http:/<server address>/display.html` or localhost or something.

Connect the other devices (clients), phones preferably, to `http:/<server address>/` and they will act as paddles.
