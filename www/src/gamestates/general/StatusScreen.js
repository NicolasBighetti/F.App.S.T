FastGame.StatusScreen = function(game){
  this.game = game;
}

FastGame.StatusScreen.prototype = {
  init: function(eventAdapter, parameters){
    this.eventAdapter = eventAdapter;
    if(!FastGame.playerColor){
      FastGame.playerColor = parameters.color ? parameters.color : 'blue';
    }
  },
  preload: function() {
    this.game.load.image('player', './img/'+FastGame.playerColor+'_char.png');
  },
  create: function() {
    this.eventAdapter.addCallback(PROTOCOL.FAST_GAME_INIT, this.goToNextScreen, this);
    this.playerPortrait = this.game.add.sprite(0,0,'player');
  },
  update: function() {

  },
  goToNextScreen: function(data){
    FastGame.stateManager.goToState(PROTOCOL.FAST_GAME_SPLASH, data);
  }
};
