FastGame.FastBalistic = function(game){
  this.game = game;
}
FastGame.FastBalistic.prototype = {
  init: function(parameters){

  },
  preload: function(){
    this.game.load.image('lamp_red','./img/lamp_red.png');
    this.game.load.image('lamp_orange','./img/lamp_orange.png');
    this.game.load.image('lamp_green','./img/lamp_green.png');
    this.game.load.image('screen', './img/screen.png');
    this.game.load.image('bar','./img/stock_bar.png');
    this.game.load.image('counter','./img/stock_counter.png');
  },
  create: function(){
     var style = { font: "32px Arial", fill: "#00FF00" };
     this.label = this.game.add.text(10, 75, 'T A R G E T  A C Q U I R E D', style);
     this.damage = this.game.add.text(175, 120, '&&&', style);
     var _this = this;
     FastGame.fastSocket.serverSocket.on('FAST_GAME_BALISTIC', function(damage){
       _this.damage.text = damage + "%!";
     });
  },
  update: function(){

  },
  destroy: function(){

  },
  endGame: function(){

  }
}
