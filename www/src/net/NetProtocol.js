var PROTOCOL = new NetworkEventBundle();

function NetworkEventBundle(){
  this.FAST_MINI_GAME_REGISTER = 'FAST_MINI_GAME_REGISTER';
  this.FAST_EVENT_BROADCAST = 'FAST_EVENT_BROADCAST';
  this.TEST = 'message';

  this.getEmitableEvent = function(){
    return [
      this.FAST_EVENT_BROADCAST,
      this.TEST
    ];
  }
}
