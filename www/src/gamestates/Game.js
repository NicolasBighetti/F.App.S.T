FastGame.Game = function(game) {
	this.game = game;
};
FastGame.Game.prototype = {
	preload: function(){
		this.game.load.spritesheet('button','img/connect.png', 200, 200, 1);
	},
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
		this.ballStartPos = { x: FastGame._WIDTH*0.5, y: 450 };
		this.clientCircle = this.game.add.graphics(0, 0);
		this.peerCircle = this.game.add.graphics(0,0);
		this.connectButton = this.game.add.button(0, 0, 'button', this.connect, this, 2, 1, 0);
		this.lastMessage = "";

		var connectSignal = new Phaser.Signal();
		var connectionColor = (data) =>{
			this.game.stage.backgroundColor = data.COLOR.color;
			this.connectButton.destroy();
			FastGame.signalRegistry.removeSignalEmition(PROTOCOL.FAST_PHONE_CONNECT);
		}
		connectSignal.add(connectionColor, this);
		FastGame.signalRegistry.addSignalEmition(PROTOCOL.FAST_PHONE_CONNECT, connectSignal);


		var privateSignal = new Phaser.Signal();
		var opts = {peerOpts: {trickle: false}, autoUpgrade: false};

		this.p2psocket = new P2P(FastGame.fastSocket.serverSocket, opts, () => {
			this.p2psocket.emit('peer-obj', 'Hello there. I am ' + this.p2psocket.peerId)
		});
		this.p2psocket.on('peer-obj', (data) => {
			console.log(data);
			this.lastMessage = JSON.stringify(data);
		});

		this.p2psocket.on('coord-peer', (coord) => {
			console.log(coord);
			this.peerCoord = coord;
		});
		var goPrivate = () => {
			this.p2psocket.upgrade();
		}
		privateSignal.add(goPrivate, this);
		FastGame.signalRegistry.addSignalEmition(PROTOCOL.FAST_PRIVATE_MINI_GAME_START, privateSignal);
		/*
		this.sockTest = io('http://192.168.1.49:8080');
		this.sockTest.emit('login', 'yili');

		this.sockTest.on('message', (message) => {

		});

		this.sockTest.emit('message', "33%");


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

		this.timerText = this.game.add.text(15, 15, this.timer, this.fontBig);
		this.keys = this.game.input.keyboard.createCursorKeys();

		FastGame._player = this.ball;
		window.addEventListener("deviceorientation", this.handleOrientation, true);

		this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
		//this.game.input.onDown.add(this.touchBroadcast, this);
	},
	connect: function(){
		this.atomID = Math.floor(Math.random() * 10);
		FastGame.fastSocket.EMIT[PROTOCOL.FAST_PHONE_CONNECT]([{'ATOM_PHONE_ID':this.atomID}])
	},
	touchBroadcast: function(pointer) {
		FastGame.broadcastChannel[PROTOCOL.FAST_EVENT_VIBRATION_WEAK]();
	},
	updateCounter: function() {
		this.timer++;
		this.timerText.setText(this.lastMessage+" "+this.timer);
	},
	sendCoord: function() {
		if(this.p2psocket){
			this.p2psocket.emit('coord-peer', {x: this.lastX, y:this.lastY});
		}
	},
	update: function() {
		if(this.game.input.activePointer.isDown){
			if(!this.time){
				this.time = Date.now();
			}
		}
		if(!this.game.input.activePointer.isDown && this.time){
			var s = (Date.now() - this.time) / 1000;
			if(s <= 1){
				FastGame.fastSocket.EMIT[PROTOCOL.FAST_EVENT_BROADCAST]([{'keyEvent':PROTOCOL.FAST_EVENT_VIBRATION_WEAK}]);
			}
			else if(s <= 4){
				FastGame.fastSocket.EMIT[PROTOCOL.FAST_EVENT_BROADCAST]([{'keyEvent':PROTOCOL.FAST_EVENT_VIBRATION_MEDIUM}]);
			}
			else{
				FastGame.fastSocket.EMIT[PROTOCOL.FAST_EVENT_BROADCAST]([{'keyEvent':PROTOCOL.FAST_EVENT_VIBRATION_STRONG}])
			}
			this.time = undefined;
		}

		if(this.game.input.x != this.lastX && this.game.input.y != this.lastY){
			this.sendCoord();
			this.lastX = this.game.input.x;
			this.lastY = this.game.input.y
			this.clientCircle.clear();
			this.clientCircle.beginFill(0x000000, 1);
			this.clientCircle.drawCircle(this.lastX, this.lastY, 10);
		}
		if(this.peerCoord){
			this.peerCircle.clear();
			this.peerCircle.beginFill(0x0F0F0F, 1);
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
