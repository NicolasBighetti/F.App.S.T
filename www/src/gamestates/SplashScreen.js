FastGame.SplashScreen = function(game){
}
FastGame.SplashScreen.prototype = {
  init: function(parameters){
    this.splashIcons = (new SplashEnum())[parameters];
  },
  preload: function(){
    for(var file in this.splashIcons){
      this.game.load.image(this.splashIcons[file][0], this.splashIcons[file][1]);
    }
    this.game.load.image('background', './img/splash_background.jpg');
    this.game.load.image('star_layer', './img/splash_parallax_layer.png');
    this.game.load.image('star_layer_2', './img/splash_parallax_layer_2.png');
    this.game.load.image('planet_layer', './img/splash_planet.png');
    //We do know every splash icon is 100*100 so we can assume its size for layout facilitation
    this._iconWidth = 100;
    this.splashFont = { font: '24px Arial', fill: '#ffffff', stroke: '#000000', strokeThickness: '10' };
  },
  create: function(){
    //this.game.stage.backgroundColor = '#FFFFFF';
    //Order matter
    this.background = this.game.add.tileSprite(0, 0, 480, 320, 'background');
    this.mediumLayer = this.game.add.tileSprite(0, 0, 480, 320, 'star_layer');
    this.frontLayer = this.game.add.tileSprite(0, 0, 480, 320, 'star_layer_2');
    this.planetLayer = this.game.add.tileSprite(0, 0, 2100, 320, 'planet_layer');
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
  },
  update: function(){
    this.background.tilePosition.x += 0.1;
    this.mediumLayer.tilePosition.x += 0.3;
    this.frontLayer.tilePosition.x += 0.5;
    this.planetLayer.tilePosition.x += 0.7;
  }
}
