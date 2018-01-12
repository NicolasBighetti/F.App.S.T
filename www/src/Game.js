Ball.Game = function(game) {
	this.game = game;
};
Ball.Game.prototype = {
	create: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.fontSmall = { font: "16px Arial", fill: "#e4beef" };
		this.fontBig = { font: "24px Arial", fill: "#e4beef" };
		this.fontMessage = { font: "24px Arial", fill: "#e4beef",  align: "center", stroke: "#320C3E", strokeThickness: 4 };
		this.timer = 0;
		this.totalTimer = 0;
		this.level = 1;
		this.maxLevels = 5;
		this.movementForce = 10;
		this.ballStartPos = { x: Ball._WIDTH*0.5, y: 450 };

		this.lastMessage = "";

		this.sockTest = io('http://10.212.115.16:8080');
		this.sockTest.emit('login', 'yili');
		this.sockTest.on('message', (message) => {

		});

		this.sockTest.emit('message', "33%");
		this.clientCircle = this.game.add.graphics(0, 0);
		this.peerCircle = this.game.add.graphics(0,0);
// graphics.lineStyle(2, 0xffd900, 1);

		var opts = {peerOpts: {trickle: false}, autoUpgrade: false};
		this.p2psocket = new P2P(this.sockTest, opts, () => {
			this.p2psocket.emit('peer-obj', 'Hello there. I am ' + this.p2psocket.peerId)
		});

		this.p2psocket.upgrade();

		this.p2psocket.on('peer-obj', (data) => {
  		console.log(data);
			this.lastMessage = JSON.stringify(data);
		});

		this.p2psocket.on('coord-peer', (coord) => {
			console.log(coord);
			this.peerCoord = coord;
		});
		/*this.sockTest.emit('connectTo', 'Smartphone');
		this.sockTest.on('connectTo', (ip) => {
			this.phoneSock = io(ip);
			this.phoneSock.on('touch', (coord) => {
					this.printTouch(coord);
			});
		});*/

		this.timerText = this.game.add.text(15, 15, "Time: "+this.timer, this.fontBig);
		this.keys = this.game.input.keyboard.createCursorKeys();

		Ball._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
		this.time.events.loop(Phaser.Timer.SECOND, this.sendCoord, this);
	},
	updateCounter: function() {
		this.timer++;
		this.timerText.setText(this.lastMessage+" "+this.timer);
	},
	sendCoord: function() {
		this.lastX = this.game.input.x;
		this.lastY = this.game.input.y;
		this.p2psocket.emit('coord-peer', {x: this.lastX, y:this.lastY});
	},
	update: function() {
		if(this.lastX && this.lastY){
			this.clientCircle.clear();
			this.clientCircle.beginFill(0xFF0000, 1);
			this.clientCircle.drawCircle(this.lastX, this.lastY, 10);
		}
		if(this.peerCoord){
			this.peerCircle.clear();
			this.peerCircle.beginFill(0x00FF00, 1);
			this.peerCircle.drawCircle(this.peerCoord.x, this.peerCoord.y, 10);
		}
	},
	handleOrientation: function(e) {
		// Device Orientation API
		var x = e.gamma; // range [-90,90], left-right
		var y = e.beta;  // range [-180,180], top-bottom
		var z = e.alpha; // range [0,360], up-down
	},

	render: function() {
		// this.game.debug.body(this.ball);
		// this.game.debug.body(this.hole);
		//console.log('x : ' + this.game.input.x + 'y : ' + this.game.input.y);

	}
};
