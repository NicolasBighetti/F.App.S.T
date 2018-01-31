FastGame.FastMeteor = function(game){
  this.game = game;
}
FastGame.FastMeteor.prototype = {
  init: function(parameters){
    this.gyro = new FastGyro();
  },
  preload: function(){

    this.gyro.init();
    this.gyro.subscribe(this.handleOrientation, this);

    this.game.load.image('paddle', './img/paddle.png')

    this.game.load.image('lamp_red','./img/lamp_red.png');
    this.game.load.image('lamp_orange','./img/lamp_orange.png');
    this.game.load.image('lamp_green','./img/lamp_green.png');
    this.game.load.image('screen', './img/screen.png');
    this.game.load.image('bar','./img/stock_bar.png');
    this.game.load.image('counter','./img/stock_counter.png');

  },
  create: function(){

    this.paddle = this.game.add.sprite(225, 270, 'paddle');
    //UI
    this.game.add.sprite(420, 0, 'screen');
    this.game.add.sprite(430, 0, 'lamp_red');
    this.game.add.sprite(80, 280, 'bar');
    this.game.add.sprite(0, 240, 'counter');
  },
  update: function(){

  },
  destroy: function(){

  },
	handleOrientation: function(e) {
    if(e.y >= 0){
      this.paddle.x += 9;
    }
    else{
      this.paddle.x -= 9;
    }
	}
}
