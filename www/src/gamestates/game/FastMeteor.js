FastGame.FastMeteor = function(game){
  this.game = game;
}
FastGame.FastMeteor.prototype = {
  init: function(eventAdapter, parameters){
    this.gyro = new FastGyro();
    this._totalMeteor = parameters.game_data.FAST_GAME_METEOR_TOTAL || 10;
  },
  preload: function(){

    this.gyro.init();
    this.game.load.image('meteor', './img/meteor.png');
    this.game.load.image('paddle', './img/paddle.png');
    this.game.load.image('limit', './img/death_line.png');

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
    this.meteorData = [];
    for(i = 0; i < this._totalMeteor; i++){
      this.meteorData.push({'x': this.game.rnd.integerInRange(0,480), 'y': -50, 'xVel': this.game.rnd.integerInRange(0, 0), 'yVel': this.game.rnd.integerInRange(100, 125)});
    }

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.paddle = this.game.add.sprite(225, 235, 'paddle');
    this.limit = this.game.add.sprite(0, 380, 'limit');

    //UI
    this.game.add.sprite(420, 0, 'screen');
    this.game.add.sprite(430, 0, 'lamp_red');
    this.game.add.sprite(80, 280, 'bar');
    this.game.add.sprite(0, 240, 'counter');

    this.gyro.subscribe(this.handleOrientation, this);
  },
  update: function(){

    if(!this.meteor){
      this.addNewMeteor();
    }
    this.background.tilePosition.x += 0.1;
    if(this.tempX){
      this.paddle.x = this.tempX;
      this.tempX = undefined;
    }
    if(this.meteor){
      if(this.checkMeteorOverlap(this.meteor, this.paddle)){
        this.paddleColision();
      }
      else if(this.checkMeteorOverlap(this.meteor, this.limit)){
        this.shipColision();
      }
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
    if(this.meteor){
      this.meteor.destroy();
      this.meteor = undefined;
    }
  },
  shipColision: function(){
    if(this.meteor){
      this.meteor.destroy();
      this.meteor = undefined;
      //Add bvvr event
      FastGame.broadcastChannel[PROTOCOL.FAST_EVENT_VIBRATION_STRONG]();
    }
  },
  addNewMeteor: function(){

    if(this.meteorData.length === 0){
      this.endGame();
    }
    else{
      this.meteor = this.game.add.sprite(this.meteorData[this.meteorData.length - 1].x, this.meteorData[this.meteorData.length - 1].y, 'meteor');
      this.game.physics.arcade.enable(this.meteor);
      this.meteor.body.velocity.setTo(this.meteorData[this.meteorData.length - 1].xVel, this.meteorData[this.meteorData.length - 1].yVel);
      this.meteorData.pop();
    }
  },
  checkMeteorOverlap: function(objectA, objectB){
    try{
      var boundsA = objectA.getBounds();
      var boundsB = objectB.getBounds();
      return Phaser.Rectangle.intersects(boundsA, boundsB);
    }
    catch(err){
      return false;
    }
  },
  endGame: function(){
    FastGame.stateManager.goToState(STATELIST.FAST_SPLASH, true, false, STATELIST.FAST_GAME_METEOR, true ,true);

  }
}
