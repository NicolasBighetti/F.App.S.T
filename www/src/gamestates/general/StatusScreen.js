FastGame.StatusScreen = function(game){
  this.game = game;
}

FastGame.StatusScreen.prototype = {
  init: function(eventAdapter, parameters){
    this.eventAdapter = eventAdapter;
    this.eventAdapter.addCallback(PROTOCOL.FAST_GAME_INIT, this.goToNextScreen, this);
  },
  preload: function() {

  },
  create: function() {

  },
  update: function() {

  },
  goToNextScreen: function(data){
    FastGame.stateManager.goToState(PROTOCOL.FAST_GAME_SPLASH, data);
  }
};
