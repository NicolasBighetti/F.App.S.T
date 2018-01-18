function CordovaUtils(){

    var WEAK_STRENGTH = 100;
    var MEDIUM_STRENGTH = 500;
    var STRONG_STRENGTH = 1000;

    var _this = this;

    this.init = function(){
        FastGame.eventRegistry.addCallback(PROTOCOL.FAST_EVENT_VIBRATION_WEAK, _this.vibrateWeak);
        FastGame.eventRegistry.addCallback(PROTOCOL.FAST_EVENT_VIBRATION_MEDIUM, _this.vibrateMedium);
        FastGame.eventRegistry.addCallback(PROTOCOL.FAST_EVENT_VIBRATION_STRONG, _this.vibrateStrong);
    }

    this.vibrateWeak = function(){
      _this.vibrate(WEAK_STRENGTH);
    }

    this.vibrateMedium = function(){
      _this.vibrate(MEDIUM_STRENGTH);
    }

    this.vibrateStrong = function(){
      _this.vibrate(STRONG_STRENGTH);
    }

    this.vibrate = function(duration){
      navigator.vibrate(duration);
    }

}
