function Broadcaster(){

  this.broadcastBehavior = []

  this.broadcastUtils = new BroadcastUtils();

  this.init = function(){
    var broadcastable = PROTOCOL.getBroadcastableEvent();
    for(var evt in broadcastable){
      let e = broadcastable[evt];
      if(this.broadcastUtils[e]){
        FastGame.eventRegistry.addCallback(e, this.broadcastUtils[e]);
        this[e] = function(option){
          this.broadcastBehavior[e](option);
          this.broadcastUtils[e](option);
        }
      }
    }
  }

  this.broadcastBehavior[PROTOCOL.FAST_EVENT_VIBRATION_WEAK] = function(){
     FastGame.fastSocket.EMIT[PROTOCOL.FAST_EVENT_BROADCAST]([{'keyEvent':PROTOCOL.FAST_EVENT_VIBRATION_WEAK}]);
  }

  this.broadcastBehavior[PROTOCOL.FAST_EVENT_VIBRATION_MEDIUM] = function(){
     FastGame.fastSocket.EMIT[PROTOCOL.FAST_EVENT_BROADCAST]([{'keyEvent':PROTOCOL.FAST_EVENT_VIBRATION_MEDIUM}]);
  }

  this.broadcastBehavior[PROTOCOL.FAST_EVENT_VIBRATION_STRONG] = function(){
     FastGame.fastSocket.EMIT[PROTOCOL.FAST_EVENT_BROADCAST]([{'keyEvent':PROTOCOL.FAST_EVENT_VIBRATION_STRONG}]);
  }


}
