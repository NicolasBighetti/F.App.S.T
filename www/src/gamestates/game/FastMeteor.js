FastGame.FastMeteor = function(game){
  this.game = game;
}
FastGame.FastMeteor.prototype = {
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


    //UI
    this.game.add.sprite(420, 0, 'screen');
    this.game.add.sprite(430, 0, 'lamp_red');
    this.game.add.sprite(80, 280, 'bar');
    this.game.add.sprite(0, 240, 'counter');
  },
  update: function(){

  },
  destroy: function(){

  }
}
