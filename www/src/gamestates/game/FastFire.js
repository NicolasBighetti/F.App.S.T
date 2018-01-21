FastGame.FastFire = function(game){
  this.game = game;
}
FastGame.FastFire.prototype = {
  init: function(parameters){
    console.log(parameters);
    this._totalRedFire = parameters.game_data.FAST_GAME_FIRE_RED;
    this._totalGreenFire = parameters.game_data.FAST_GAME_FIRE_GREEN;
    this._totalBlueFire = parameters.game_data.FAST_GAME_FIRE_BLUE;
    this._totalPurpleFire = parameters.game_data.FAST_GAME_FIRE_PURPLE;
  },
  preload: function(){
    this.game.load.spritesheet('red_fire', './img/flame_sprite.png', 64, 64, 2);
    this.decibelMeter = DECIBELMETER;
    this.currentRedFire = this._totalRedFire;
    if(this._totalGreenFire){
      this.currentGreenFire = this._totalGreenFire;
    }
    if(this._totalBlueFire){
      this.currentBlueFire = this._totalBlueFire;
    }
    if(this._totalPurpleFire){
      this.currentPurpleFire = this._totalPurpleFire;
    }
    this.activeFlame = undefined;
  },
  create: function(){
    var _minWidth = 64;
    var _minHeight = 64;
    var _maxWidth = 420;
    var _maxHeight = 280;
    for(var i = 0; i <this._totalRedFire; i++){
      var fire = this.game.add.sprite(this.game.rnd.realInRange(_minWidth, _maxWidth), this.game.rnd.realInRange(_minHeight, _maxHeight), 'red_fire');
      fire.animations.add('burn');
      fire.animations.play('burn', this.game.rnd.realInRange(6,8), true);
      fire.hitpoint = this.game.rnd.realInRange(5,20);
      fire.inputEnabled = true;
      fire.events.onInputOver.add(function(sprite, input){
        this.activeFlame = sprite;
      }, this);
      fire.events.onInputOut.add(function(sprite, input){
        this.activeFlame = undefined;
      }, this);
    }


    var onBlow = function(db){
      if(this.activeFlame){
        this.activeFlame.hitpoint -= (db/25);
        if(this.activeFlame.hitpoint <= 0){
          this.activeFlame.destroy();
          this.activeFlame = undefined;
          return;
        }
      }
    };
    this.decibelMeter.subscribe(onBlow, this);
    this.decibelMeter.destroy = function(){
      this.decibelMeter.unsubscribe(onBlow, this);
    }
  },
  destroy: function(){
    this.decibelMeter.destroy();
    this.activeFlame = undefined;
  }
}
