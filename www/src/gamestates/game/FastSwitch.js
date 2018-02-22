FastGame.FastSwitch = function(game){
  this.game = game;
}
FastGame.FastSwitch.prototype = {
  init: function(eventAdapter, parameters){
  },
  preload: function(){
    this.game.load.image('background', './img/metal_tile.png');
    this.game.load.image('lamp_red','./img/lamp_red.png');
    this.game.load.image('lamp_orange','./img/lamp_orange.png');
    this.game.load.image('lamp_green','./img/lamp_green.png');
    this.game.load.image('screen', './img/screen.png');
    this.game.load.image('bar','./img/stock_bar.png');
    this.game.load.image('counter','./img/stock_counter.png');
    this.game.load.image('switch', './img/switch.png');
    this.game.load.image('mask', './img/mask.png');
  },
  create: function(){
    this.game.add.tileSprite( 0, 0, 480, 320, 'background');
    var _minWidth = 0;
    var _minHeight = 0;
    var _maxWidth = 400;
    var _maxHeight = 170;

    var _switchHeight = 50;
    var _switchWidth = 50;

    var xSwitch = this.game.rnd.integerInRange(_minWidth, _maxWidth);
    var ySwitch = this.game.rnd.integerInRange(_minHeight, _maxHeight);

    var swtch = this.game.add.sprite(xSwitch, ySwitch, 'switch');

    this.xImpact = xSwitch + _switchWidth / 2;
    this.yImpact = ySwitch + _switchHeight / 2;
    swtch.inputEnabled = true;
    swtch.events.onInputDown.add(function(){
      this.endGame();
    }, this);

    this.mask = this.game.add.sprite(0,0, 'mask');

    //UI
    this.game.add.sprite(420, 0, 'screen');
    this.game.add.sprite(430, 0, 'lamp_red');
    this.game.add.sprite(80, 280, 'bar');
    this.game.add.sprite(0, 240, 'counter');

    this.game.input.addMoveCallback(this.checkDistance, this);
  },
  update: function(){

  },
  destroy: function(){

  },
  endGame: function(){
    this.mask.destroy();
    this.game.time.events.add(1000, function(){FastGame.stateManager.goToState(STATELIST.FAST_SPLASH, true, false, STATELIST.FAST_GAME_SWITCH, true ,true)}).autoDestroy = true;
  },
  checkDistance: function(pointer){
    var dist = function(ax, ay, bx, by){
        var a = ax - bx;
        var b = ay - by;
        return c = Math.sqrt( a*a + b*b );
      };

      var distance = dist(this.xImpact, this.yImpact, pointer.x, pointer.y);
      var buffer = '';
      for(i = 0; i < distance / 2; i++){
        buffer += '|';
      }
      //console.log(buffer);

      var baseTime = 100;
      var vibrationStrength;


      if(distance > 25 && distance < 80){
        this.lastState = this.currentState;
        this.currentState = 1;
        baseTime = 500;
        vibrationStrength = 0.5;
      }
      else if(distance <= 25){
        this.lastState = this.currentState;
        this.currentState = 0;
        baseTime = 1000;
        vibrationStrength = 0;
      }
      else{
        this.lastState = this.currentState;
        this.currentState = 2;
        baseTime = 250;
        vibrationStrength = 0.25;
      }
      var computedDuration = baseTime * (1 - vibrationStrength);
      if(this.lastState != this.currentState){
        this.isVibrating = false;
        navigator.vibrate([]);
      }
      if(!this.isVibrating){
        navigator.vibrate(computedDuration);
        this.isVibrating = true;
        this.game.time.events.add(1000, function(){this.isVibrating = false}, this).autoDdestroy = true;
      }
      this.targetDistancce = distance;
  }
}
