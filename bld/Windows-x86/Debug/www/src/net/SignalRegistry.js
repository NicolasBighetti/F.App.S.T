function SignalRegistry(){

  this.eventCallbackMap = [];

  this.addSignalEmition = function(keyEvent, signal){
    var fct = function(data){
                if(signal){
                  signal.dispatch(data);
                }
              };
    FastGame.fastSocket.addOnServerCallback(keyEvent, fct);
    this.eventCallbackMap[keyEvent] = fct;
  }

  this.removeSignalEmition = function(keyEvent){
    if(this.eventCallbackMap[keyEvent]){
      FastGame.fastSocket.removeOnServerCallback(keyEvent, this.eventCallbackMap[keyEvent]);
      this.eventCallbackMap[keyEvent] = undefined;
    }
  }
}
