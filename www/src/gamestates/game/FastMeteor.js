FastGame.FastMeteor = function(game){
  this.game = game;
}
FastGame.FastMeteor.prototype = {
  init: function(parameters){
    this.gyro = new FastGyro();
  },
  preload: function(){

    this.gyro.init();
    this.game.load.image('meteor', './img/meteor.png');
    this.game.load.image('paddle', './img/paddle.png')

    this.game.load.image('background', './img/splash_background.jpg');

    this.game.load.image('lamp_red','./img/lamp_red.png');
    this.game.load.image('lamp_orange','./img/lamp_orange.png');
    this.game.load.image('lamp_green','./img/lamp_green.png');
    this.game.load.image('screen', './img/screen.png');
    this.game.load.image('bar','./img/stock_bar.png');
    this.game.load.image('counter','./img/stock_counter.png');

  },
  create: function(){
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
    this.background.tilePosition.x += this.game.rnd.realInRange(0, 480);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.meteor = this.game.add.sprite(225, -50, 'meteor');
    this.game.physics.arcade.enable(this.meteor);
    this.meteor.body.velocity.setTo(0, 75);

    this.paddle = this.game.add.sprite(225, 235, 'paddle');

    //UI
    this.game.add.sprite(420, 0, 'screen');
    this.game.add.sprite(430, 0, 'lamp_red');
    this.game.add.sprite(80, 280, 'bar');
    this.game.add.sprite(0, 240, 'counter');

    this.gyro.subscribe(this.handleOrientation, this);
  },
  update: function(){
    this.background.tilePosition.x += 0.1;
    if(this.tempX){
      this.paddle.x = this.tempX;
      this.tempX = undefined;
    }

    if(this.checkMeteorOverlap()){
      this.paddleColision();
    }

  },
  destroy: function(){

  },
	handleOrientation: function(e) {
    if(e.y >= 0){
      if(this.paddle.x < 440){
        this.tempX = this.paddle.x + 9;
      }
    }
    else{
      if(this.paddle.x >= 9){
        this.tempX = this.paddle.x - 9;
      }
    }
	},
  paddleColision: function(){
    this.meteor.destroy();
  },
  checkMeteorOverlap: function(){
    if(this.meteor && this.paddle){
      var boundsA = this.meteor.getBounds();
      var boundsB = this.paddle.getBounds();
      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
    else{
      return false;
    }
  }
}
