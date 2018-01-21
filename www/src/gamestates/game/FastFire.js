FastGame.FastFire = function(game){
  this.game = game;
}
FastGame.FastFire.prototype = {
  init: function(parameters){
    console.log(parameters);
    this.game.stage.disableVisibilityChange = true;
    this._totalRedFire = parameters.game_data.FAST_GAME_FIRE_RED;
    if(parameters.game_data.FAST_GAME_FIRE_GREEN){
      this._totalGreenFire = parameters.game_data.FAST_GAME_FIRE_GREEN;
    }
    if(parameters.game_data.FAST_GAME_FIRE_BLUE){
      this._totalBlueFire = parameters.game_data.FAST_GAME_FIRE_BLUE;
    }
    if(parameters.game_data.FAST_GAME_FIRE_PURPLE){
        this._totalPurpleFire = parameters.game_data.FAST_GAME_FIRE_PURPLE;
    }
    this.playerColor = 'red';
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
    var flameInit = function(flameNumber, assetKey, isExtinguishable, context){
      var flameArray = [];
      for(var i = 0; i <flameNumber; i++){
        var fire = context.game.add.sprite(context.game.rnd.realInRange(_minWidth, _maxWidth), context.game.rnd.realInRange(_minHeight, _maxHeight), assetKey);
        fire.animations.add('burn');
        fire.animations.play('burn', context.game.rnd.realInRange(6,8), true);
        if(isExtinguishable){
          fire.hitpoint = context.game.rnd.realInRange(5,20);
          fire.inputEnabled = true;
          fire.events.onInputOver.add(function(sprite, input){
            context.activeFlame = sprite;
          }, this);
          fire.events.onInputOut.add(function(sprite, input){
            context.activeFlame = undefined;
          }, this);
        }
        flameArray.push(fire);
      }
      return flameArray;
    };

    this['red'] = flameInit(this._totalRedFire, 'red_fire', (this.playerColor == 'red'), this);
    if(this._totalBlueFire){
      this['blue'] = flameInit(this._totalBlueFire, 'blue_fire', (this.playerColor == 'blue'), this);
    }
    if(this._totalGreenFire){
      this['green'] = flameInit(this._totalGreenFire, 'green_fire', (this.playerColor == 'green'), this);
    }
    if(this._totalPurpleFire){
      this['purple'] = flameInit(this._totalPurpleFire, 'purple_fire', (this.playerColor == 'purple'), this);
    }
    var onBlow = function(db){
      if(this.activeFlame && db >= 65){
        this.activeFlame.hitpoint -= (db/25);
        if(this.activeFlame.hitpoint <= 0){
          var index = this[this.playerColor].indexOf(this.activeFlame);
          this[this.playerColor][index].destroy();
          this[this.playerColor].splice(index,1);
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
  update: function(){
    var total = 0;
    if(this['red']){
        while(this['red'].length > this._totalRedFire){
          this['red'].pop().destroy();
        }
      total += this['red'].length || 0;
    }
    if(this['blue']){
        while(this['blue'].length > this._totalBlueFire){
          this['blue'].pop().destroy();
        }
      total += this['blue'].length || 0;
    }
    if(this['green']){
        while(this['green'].length > this._totalGreenFire){
          this['green'].pop().destroy();
        }
      total += this['green'].length || 0;
    }
    if(this['purple']){
        while(this['purple'].length > this._totalPurpleFire){
          this['purple'].pop().destroy();
        }
      total += this['purple'].length || 0;
    }
    if(total == 0){
      this.endGame();
    }
  },
  endGame: function(){
    this.game.state.start('SplashScreen', true, false, MINIGAMELIST.FAST_GAME_FIRE);
  },
  destroy: function(){
    this.decibelMeter.destroy();
    this.activeFlame = undefined;
    this['red'] = undefined;
    this['blue'] = undefined;
    this['green'] = undefined;
    this['purple'] = undefined;

    this._totalRedFire = undefined;
    this._totalGreenFire = undefined;
    this._totalBlueFire = undefined;
    this._totalPurpleFire = undefined;
  }
}
