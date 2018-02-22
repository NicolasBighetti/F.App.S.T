function SplashEnum(){
  this.FAST_SPLASH_BLOW = ['BLOW','./img/blow.png'];
  this.FAST_SPLASH_TOUCH = ['TOUCH','./img/touch.png'];
  this.FAST_SPLASH_SHAKE = '';
  this.FAST_SPLASH_TILT = '';
  this.FAST_SPLASH_FEEL = '';

  this[STATELIST.FAST_GAME_FIRE] =
    [
      this.FAST_SPLASH_TOUCH,
      this.FAST_SPLASH_BLOW
    ];

  this[STATELIST.FAST_GAME_METEOR] = [

  ];

  this[STATELIST.FAST_GAME_SWITCH] = [

  ];

  this[STATELIST.FAST_GAME_BALLISTIC] = [

  ];
  }
