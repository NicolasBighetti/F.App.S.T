var PROTOCOL = new NetworkEventBundle();

function NetworkEventBundle(){
  //For testing purpose, to be refacctored at a later date
  this.FAST_MINI_GAME_REGISTER = 'FAST_MINI_GAME_REGISTER';
  this.FAST_EVENT_BROADCAST = 'FAST_EVENT_BROADCAST';


  this.getEmitableEvent = function(){
    return [
      this.FAST_EVENT_BROADCAST,
      this.TEST
    ];
  }
}
