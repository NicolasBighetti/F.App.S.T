FastGame.SplashScreen = function(game){
}
FastGame.SplashScreen.prototype = {
  init: function(parameters){
    this.splashIcons = (new SplashEnum())[parameters] || [];
    this.commingMiniGame = parameters;
    this.game.stage.disableVisibilityChange = true;
    this.isSolo = false;
    if(false){
      var signal = new Phaser.Signal();
      signal.add(this.goToMiniGame, this);
          FastGame.fastSocket.addOnServerCallback(PROTOCOL.FAST_PRIVATE_START, this.goToMiniGame, signal);
      };
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
    this.game.load.image('planet_layer', './img/space_mosaic.png');
    for(var i = 0; i <= 9; i++){
      this.game.load.image('planet'+i, './img/planet'+i+'.png');
    }
    //We do know every splash icon is 100*100 so we can assume its size for layout facilitation
    this._iconWidth = 100;
    this._backgroundSpeedBound = 0.1;
    this._mediumLayerSpeedBound = 0.3;
    this._frontLayerSpeedBound = 0.5;
    this._planetLayerSpeedBound = 0.7;
    this.scaleValue = 1;
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

    this.planets = [];

    var availableSpace = (FastGame._WIDTH) / this.splashIcons.length;
    var splashTargetCenter = FastGame._HEIGHT * 0.3;
    var textTargetCenter = splashTargetCenter + 150;
    var offset = 0;
    var margin = (availableSpace - this._iconWidth) / 2;
    //Let's prevent that from hapenning
    if(margin < 0){
      margin = 0;
    }
    for(var file in this.splashIcons){
      offset += margin;
      this.game.add.sprite(offset, splashTargetCenter, this.splashIcons[file][0]);
      this.game.add.text(offset, textTargetCenter, this.splashIcons[file][0], this.splashFont);
      //		this.timerText = this.game.add.text(15, 15, "Time: "+this.timer, this.fontBig);
      offset += (this._iconWidth + margin);
    }

    //random offset for layers
    this.background.tilePosition.x += this.game.rnd.realInRange(0, 480);
    this.mediumLayer.tilePosition.x += this.game.rnd.realInRange(0, 480);
    this.frontLayer.tilePosition.x += this.game.rnd.realInRange(0, 480);
    this.planetLayer.tilePosition.x += this.game.rnd.realInRange(0, 2100);

    this.game.input.onHold.add(function(){
      //this.scaleValueUpper = 1.1;
      this.goToMiniGame('its sunday my dudes');
    },this);

  },
  update: function(){
    this.background.tilePosition.x += this.backgroundAcceleration;
    this.mediumLayer.tilePosition.x += this.mediumLayerAcceleration;
    this.frontLayer.tilePosition.x += this.frontLayerAcceleration;
    this.planetLayer.tilePosition.x += this.planetLayerAcceleration;

    if(this.planets.length > 0){
      for(var i = 0; i < this.planets.length; i++){
        this.planets[i].x += 1;
        if(this.planets[i].x > 600){
          this.planets[i].x = -100;
        }
      }
    }

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
    this.commingMiniGame = undefined;

    this.backgroundAcceleration = undefined;
    this.mediumLayerAcceleration = undefined;
    this.frontLayerAcceleration = undefined;
    this.planetLayerAcceleration = undefined;

    this._backgroundSpeedBound = undefined;
    this._mediumLayerSpeedBound = undefined;
    this._frontLayerSpeedBound = undefined;
    this._planetLayerSpeedBound = undefined;

    this.scaleValue = undefined;
    this.decibelMeter.destroy();
  },
  goToMiniGame: function(launchData){
    launchData = {'game_data':{'FAST_GAME_METEOR_TOTAL': 10}};
    this.game.state.start(this.commingMiniGame, true, false, launchData, this.isSolo);
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
        this.backgroundAcceleration -= (db / 200);
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
    this.decibelMeter = DECIBELMETER;
    this.decibelMeter.subscribe(faster, this);
    this.decibelMeter.destroy = function(){
      this.decibelMeter.unsubscribe(faster, this);
    }
  },
  TOUCH: function(){
    this.game.input.onDown.add(function(pointer){
      var plt = this.game.rnd.integerInRange(0,9);
      this.planets.push(this.game.add.sprite(pointer.x, pointer.y, 'planet'+plt));
    },this);
  }
}
