var FastGame = {
	_WIDTH: 480,
	_HEIGHT: 320,
	fastSocket: new FASockeT('192.168.1.50'),
	eventRegistry: new EventRegistry(),
	broadcastChannel: new Broadcaster(),
	signalRegistry: new SignalRegistry(),

};
FastGame.Boot = function(game) {};
FastGame.Boot.prototype = {
	preload: function() {
		FastGame.fastSocket.init();
		FastGame.eventRegistry.init();
		FastGame.broadcastChannel.init();
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		this.game.state.start('SplashScreen', true, false, MINIGAMELIST.FAST_GAME_METEOR);
	}
};
