FastGame.FastFire = function(game){
  this.game = game;
}
FastGame.FastFire.prototype = {
  init: function(parameters){
    console.log(parameters);
    this.game.stage.disableVisibilityChange = true;
    this.totalFire = [];
    this.currentFire = [];
    this.totalFire.red = parameters.game_data.FAST_GAME_FIRE_RED;
    if(parameters.game_data.FAST_GAME_FIRE_GREEN){
      this.totalFire.green = parameters.game_data.FAST_GAME_FIRE_GREEN;
    }
    if(parameters.game_data.FAST_GAME_FIRE_BLUE){
      this.totalFire.blue = parameters.game_data.FAST_GAME_FIRE_BLUE;
    }
    if(parameters.game_data.FAST_GAME_FIRE_PURPLE){
        this.totalFire.purple = parameters.game_data.FAST_GAME_FIRE_PURPLE;
    }
    this.playerColor = 'red';
    this.isWin = false;
    this.isLost = false;
    this.isSolo = true;
    this.isRoomMaster = true;
  },
  preload: function(){
    this.game.load.spritesheet('red_fire', './img/flame_sprite.png', 64, 64, 2);
    this.game.load.spritesheet('blue_fire', './img/flame_blue.png', 64, 64, 2);
    this.game.load.spritesheet('purple_fire', './img/flame_purple.png', 64, 64, 2);
    this.game.load.spritesheet('green_fire', './img/flame_green.png', 64, 64, 2);
    this.decibelMeter = DECIBELMETER;
    this.currentFire.red = this.totalFire.red;
    if(this.totalFire.green){
      this.currentFire.green = this.totalFire.green;
    }
    if(this.totalFire.blue){
      this.currentFire.blue = this.totalFire.blue;
    }
    if(this.totalFire.purple){
      this.currentFire.purple = this.totalFire.purple;
    }
    this.activeFlame = undefined;
  },
  create: function(){
    var _minWidth = 0;
    var _minHeight = 0;
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

    this['red'] = flameInit(this.totalFire.red, 'red_fire', (this.playerColor == 'red'), this);
    if(this.totalFire.blue){
      this['blue'] = flameInit(this.totalFire.blue, 'blue_fire', (this.playerColor == 'blue'), this);
    }
    if(this.totalFire.green){
      this['green'] = flameInit(this.totalFire.green, 'green_fire', (this.playerColor == 'green'), this);
    }
    if(this.totalFire.purple){
      this['purple'] = flameInit(this.totalFire.purple, 'purple_fire', (this.playerColor == 'purple'), this);
    }
    var onBlow = function(db){
      if(this.activeFlame && db >= 65){
        this.activeFlame.hitpoint -= (db/25);
        if(this.activeFlame.hitpoint <= 0){
          var index = this[this.playerColor].indexOf(this.activeFlame);
          this[this.playerColor][index].destroy();
          this[this.playerColor].splice(index,1);
          this.currentFire[this.playerColor]--;
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

    for(var key in this.totalFire){
      while(this[key].length > this.totalFire[key]){
        this[key].pop().destroy();
        this.currentFire[key]--;

      }
      total += this[key].length;

      if((key === this.playerColor) && this.isSolo){
        if(!this.currentFire[key]){
          this.endGame();
        }
      }
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

    this.totalFire = undefined;
    this.currentFire = undefined;
  }
}
