var PROTOCOL = new NetworkEventBundle();

function NetworkEventBundle(){
  //Change the variable value but not the variable name or you'll break stuff 
  //For testing purpose, to be refacctored at a later date
  this.FAST_MINI_GAME_REGISTER = 'FAST_MINI_GAME_REGISTER';
  this.FAST_EVENT_BROADCAST = 'FAST_EVENT_BROADCAST';

  //Broadcast event PROTOCOL
  this.FAST_EVENT_VIBRATION_WEAK = 'FAST_EVENT_VIBRATION_WEAK';
  this.FAST_EVENT_VIBRATION_MEDIUM = 'FAST_EVENT_VIBRATION_MEDIUM';
  this.FAST_EVENT_VIBRATION_STRONG = 'FAST_EVENT_VIBRATION_STRONG';
  this.FAST_EVENT_LIGHT_OFF = 'FAST_EVENT_LIGHT_OFF';
  this.FAST_EVENT_LIGHT_ON = 'FAST_EVENT_LIGHT_ON';
  this.FAST_EVENT_SOUND_EFFECT = 'FAST_EVENT_SOUND_EFFECT';


  this.getEmitableEvent = function(){
    return [
      this.FAST_EVENT_BROADCAST
    ];
  }

  this.getBroadcastableEvent = function(){
    return [
      this.FAST_EVENT_VIBRATION_WEAK,
      this.FAST_EVENT_VIBRATION_MEDIUM,
      this.FAST_EVENT_VIBRATION_STRONG,
      this.FAST_EVENT_LIGHT_OFF,
      this.FAST_EVENT_LIGHT_ON,
      this.FAST_EVENT_SOUND_EFFECT
    ];
  }

}
