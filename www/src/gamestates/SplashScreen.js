FastGame.SplashScreen = function(game){
}
FastGame.SplashScreen.prototype = {
  init: function(parameters){
    this.splashIcons = (new SplashEnum())[parameters];
  },
  preload: function(){
    for(var file in this.splashIcons){
      this.game.load.image(this.splashIcons[file][0], this.splashIcons[file][1]);
      if(this[this.splashIcons[file][0]]){
        this[this.splashIcons[file][0]]();
      }
    }
    this.game.load.image('background', './img/splash_background.jpg');
    this.game.load.image('star_layer', './img/splash_parallax_layer.png');
    this.game.load.image('star_layer_2', './img/splash_parallax_layer_2.png');
    this.game.load.image('planet_layer', './img/splash_planet.png');
    //We do know every splash icon is 100*100 so we can assume its size for layout facilitation
    this._iconWidth = 100;
    this._backgroundSpeedBound = 0.1;
    this._mediumLayerSpeedBound = 0.3;
    this._frontLayerSpeedBound = 0.5;
    this._planetLayerSpeedBound = 0.7;
    this.splashFont = { font: '24px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: '10' };

  },
  create: function(){
    //this.game.stage.backgroundColor = '#FFFFFF';
    //Order matter
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
    this.backgroundAcceleration = this._backgroundSpeedBound;
    this.mediumLayer = this.game.add.tileSprite(0, 0, 480, 320, 'star_layer');
    this.mediumLayerAcceleration = this._mediumLayerSpeedBound;
    this.frontLayer = this.game.add.tileSprite(0, 0, 480, 320, 'star_layer_2');
    this.frontLayerAcceleration = this._frontLayerSpeedBound;
    this.planetLayer = this.game.add.tileSprite(0, 0, 2100, 320, 'planet_layer');
    this.planetLayerAcceleration = this._planetLayerSpeedBound;
    var availableSpace = (FastGame._WIDTH) / this.splashIcons.length;
    var splashTargetCenter = FastGame._HEIGHT * 0.3;
    var textTargetCenter = splashTargetCenter + 150;
    var offset = 0;
    var margin = (availableSpace - this._iconWidth) / 2;
    //Let's prevent that from hapenning
    if(margin < 0){
      margin = 0;
    }
    var textref;
    for(var file in this.splashIcons){
      offset += margin;
      this.game.add.sprite(offset, splashTargetCenter, this.splashIcons[file][0]);
      textref = this.game.add.text(offset, textTargetCenter, this.splashIcons[file][0], this.splashFont);
      //		this.timerText = this.game.add.text(15, 15, "Time: "+this.timer, this.fontBig);
      offset += (this._iconWidth + margin);
    }
    this.decibelMeter.subscribe(function(db){
      textref.setText('Decibel : ' + db);
    }, this);
  },
  update: function(){
    this.background.tilePosition.x += this.backgroundAcceleration;
    this.mediumLayer.tilePosition.x += this.mediumLayerAcceleration;
    this.frontLayer.tilePosition.x += this.frontLayerAcceleration;
    this.planetLayer.tilePosition.x += this.planetLayerAcceleration;
  },
  destroy: function(){
    //Tentative to manage memory, apparently the engine designer didn't find it useful to allow for manual memory management of assets
    // "Put it in an iFrame, juste like flash object. Loading a game within an iframe is not that bad and you don't have to worry about memory" SebastianNette, expert member
    this._iconWidth = undefined;
    this.splashFont = undefined;
    this.background = undefined;
    this.mediumLayer = undefined;
    this.frontLayer = undefined;
    this.planetLayer = undefined;
    this.splashIcons = undefined;

    this.backgroundAcceleration = undefined;
    this.mediumLayerAcceleration = undefined;
    this.frontLayerAcceleration = undefined;
    this.planetLayerAcceleration = undefined;

    this._backgroundSpeedBound = undefined;
    this._mediumLayerSpeedBound = undefined;
    this._frontLayerSpeedBound = undefined;
    this._planetLayerSpeedBound = undefined;

    this.decibelMeter.destroy();
  },
  BLOW: function(){
    var faster = function(db){
    if(db > 75){
      this.backgroundAcceleration += (db / 400);
      this.mediumLayerAcceleration += (db / 300);
      this.frontLayerAcceleration += (db / 250);
      this.planetLayerAcceleration += (db / 175);
    }
    else{
      if((this.backgroundAcceleration - (db / 100)) >= this._backgroundSpeedBound){
        this.backgroundAcceleration -= (db / 100);
      }
      else{
        this.backgroundAcceleration = this._backgroundSpeedBound;
      }
      if((this.mediumLayerAcceleration - (db / 100)) >= this._mediumLayerSpeedBound){
        this.mediumLayerAcceleration -= (db / 150);
      }
      else{
        this.mediumLayerAcceleration = this._mediumLayerSpeedBound;
      }
      if((this.frontLayerAcceleration - (db / 100)) >= this._frontLayerSpeedBound){
        this.frontLayerAcceleration -= (db / 150);
      }
      else {
        this.frontLayerAcceleration = this._frontLayerSpeedBound;
      }
      if((this.planetLayerAcceleration - (db / 100))>= this._planetLayerSpeedBound){
        this.planetLayerAcceleration -= (db / 125);
      }
      else{
        this.planetLayerAcceleration = this._planetLayerSpeedBound;
      }
    }
    }
    this.decibelMeter = new DecibelMeter();
    this.decibelMeter.subscribe(faster, this);
  }
}
