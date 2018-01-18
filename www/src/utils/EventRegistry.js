//Register all phaser signal used with broadcasted event
function EventRegistry(){
    
    this.relaySignal = new Phaser.Signal();

    this.init = function(){
      this.relaySignal.add(this.eventBroadcastCallback, this);
      FastGame.fastSocket.addBroadcastCallback(PROTOCOL.FAST_EVENT_BROADCAST, this.relaySignal);
      this.callbackArray = [];
    };
    
    //keyEvent : the event the callback must react to
    this.addCallback = function(keyEvent, callback){
      this.callbackArray[keyEvent] = callback;
    }
    
    this.eventBroadcastCallback(data){
      for(var key in data){
        this.callbackArray[data[key].keyEvent](data[key].option);
      }
    }
}