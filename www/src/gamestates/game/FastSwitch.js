FastGame.FastSwitch = function(game){
  this.game = game;
}
FastGame.FastSwitch.prototype = {
  init: function(parameters){

  },
  preload: function(){
    this.game.load.image('background', './img/metal_tile.png');
    this.game.load.image('lamp_red','./img/lamp_red.png');
    this.game.load.image('lamp_orange','./img/lamp_orange.png');
    this.game.load.image('lamp_green','./img/lamp_green.png');
    this.game.load.image('screen', './img/screen.png');
    this.game.load.image('bar','./img/stock_bar.png');
    this.game.load.image('counter','./img/stock_counter.png');
    this.game.load.image('switch', './img/switch.png')
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
    this.game.state.start('SplashScreen', true, false, MINIGAMELIST.FAST_GAME_SWITCH);
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
      console.log(buffer);
  }
}
