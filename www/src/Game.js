Ball.Game = function(game) {};
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

		this.serverSocket = new WebSocket('ws://localhost:8080');

		this.timerText = this.game.add.text(15, 15, "Time: "+this.timer, this.fontBig);
		this.keys = this.game.input.keyboard.createCursorKeys();

		Ball._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

	},
	updateCounter: function() {
		this.timer++;
		this.timerText.setText("Time: "+this.timer);
	},
	update: function() {

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
	}
};
