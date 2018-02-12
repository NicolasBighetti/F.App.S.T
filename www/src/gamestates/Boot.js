var FastGame = {
	_WIDTH: 480,
	_HEIGHT: 320,
	fastSocket: new FASockeT(),
	eventRegistry: new EventRegistry(),
	broadcastChannel: new Broadcaster(),
	signalRegistry: new SignalRegistry(),
};
FastGame.Boot = function(game) {
	this.game = game;
};
FastGame.Boot.prototype = {
	preload: function() {
		FastGame.fastSound = new FastSound(this.game);
		this.game.load.image('demo', './img/demo_card.png');
		this.game.load.image('fast', './img/fast_card.png');
		this.game.load.image('balistic', './img/balisblock.png');

	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		DECIBELMETER = new DecibelMeter();

		this.demo = this.game.add.sprite(150, 50, 'demo');
		this.fast = this.game.add.sprite(150, 150, 'fast');
		this.bal = this.game.add.sprite(400, 250, 'balistic');
		this.demo.scale.setTo(0.6,0.6);
		this.fast.scale.setTo(0.6,0.6);
		this.demo.inputEnabled = true;
		this.fast.inputEnabled = true;
		this.bal.inputEnabled = true;
		this.demo.events.onInputUp.add(function(){
			this.goToNextState(true);
		}, this);
		this.fast.events.onInputUp.add(function(){
			this.goToNextState(false);
		}, this);
		this.bal.events.onInputUp.add(function(){
			var ipp = '10.212.115.16';
			var signalResult = FastGame.fastSocket.init(ipp);
			signalResult.add(function(isGood){
				if(isGood){
					FastGame.eventRegistry.init();
					FastGame.broadcastChannel.init();
					this.game.state.start('Balistic');
				}
				else{
					console.log('bootlol');
				}
			}, this);
		}, this);
	},
	goToNextState: function(isDemo){
		if(!isDemo){
			this.game.state.start('ColorConnector');
		}
		else{
			var ipp = '10.212.115.16';
			var signalResult = FastGame.fastSocket.init(ipp);
			signalResult.add(function(isGood){
				if(isGood){
					FastGame.eventRegistry.init();
					FastGame.broadcastChannel.init();
					this.game.state.start('SplashScreen', true, false, MINIGAMELIST.FAST_GAME_SWITCH, true ,isDemo);
				}
				else{
					console.log('bootlol');
				}
			}, this);
		}
	}
};
