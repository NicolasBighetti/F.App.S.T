var FastGame = {
	_WIDTH: 320,
	_HEIGHT: 480,
	fastSocket: new FASockeT('192.168.1.49')
};
FastGame.Boot = function(game) {};
FastGame.Boot.prototype = {
	preload: function() {
		FastGame.fastSocket.init();
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.state.start('Game');
	}
};
