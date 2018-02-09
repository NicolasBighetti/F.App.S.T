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
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		DECIBELMETER = new DecibelMeter();
		//this.game.state.start('SplashScreen', true, false, MINIGAMELIST.FAST_GAME_SWITCH);
		this.game.state.start('ColorConnector');


	}
};
