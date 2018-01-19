var FastGame = {
	_WIDTH: 320,
	_HEIGHT: 480,
	fastSocket: new FASockeT('10.212.115.16'),
	eventRegistry: new EventRegistry(),
	broadcastChannel: new Broadcaster(),
	signalRegistry: new SignalRegistry()
};
FastGame.Boot = function(game) {};
FastGame.Boot.prototype = {
	preload: function() {
		FastGame.fastSocket.init();
		FastGame.eventRegistry.init();
		FastGame.broadcastChannel.init();
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Game');
	}
};
