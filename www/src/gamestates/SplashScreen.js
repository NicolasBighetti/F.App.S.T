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
    this.game.load.image('background', './img/splash_background_CROP.jpg');
    //We do know every splash icon is 100*100 so we can assume its size for layout facilitation
    this._iconWidth = 100;
  },
  create: function(){
    //this.game.stage.backgroundColor = '#FFFFFF';
    this.game.add.sprite(0,0, 'background');
    var availableSpace = (FastGame._WIDTH) / this.splashIcons.length;
    var splashTargetCenter = FastGame._HEIGHT * 0.3;
    var offset = 0;
    var margin = (availableSpace - this._iconWidth) / 2;
    //Let's prevent that from hapenning
    if(margin < 0){
      margin = 0;
    }
    for(var file in this.splashIcons){
      offset += margin;
      this.game.add.sprite(offset, splashTargetCenter, this.splashIcons[file][0]);
      offset += (this._iconWidth + margin);

    }
  }
}
