//Take a given minigame event enum
//add all emitable event as emit to the main socket
//add all onable event as on to the main socket
//When destroy is called, all callback are removed from the socket
function EventAdapter(mgenum, fastSocket){

  this.socket = fastSocket;

  this.EMIT = [];

  this.ON = [];

  //add all emit function
  if(mgenum.emit){
    
  }

  //prepare to add network event callback
  if(mgenum.on){
    for(onEvt in mgenum.on){
      this.ON[mgenum.on[onEvt]] =  undefined;
    }
  }

  this.destroy = function(){
    //First we destroy all "on" callback
    for(evt in this.ON){
      //for each key / callback value, we remove it from the socket to avoid polution
      //Certainly less expensive than creating a new socket every time we change state
      this.removeCallback(evt);
    }
    //Then I guess we do something with EMIT
    //should trigger destruction on next GC (according to the web(since it's js it certainly won't do shit but jey whatever at least i'm trying))
    this.EMIT = undefined;
    this.ON = undefined;
  };

  this.addCallback = function(keyEvent, callback, context){
    if((keyEvent && this.ON[keyEvent]) && callback){
      //we set the function context if one is provided
      if(context){
        callback = callback.bind(context);
      }
      //we add the callback to the on list so as to be able to remove it after
      this.ON[keyEvent] = callback;
      //We add the callback to the socket
      this.socket.on(keyEvent, callback);
      return true;
    }
    else{
      return false;
    }
  }

  this.removeCallback(keyEvent){
    if(this.ON[keyEvent]){
      this.socket.removeListener(keyEvent, this.ON[keyEvent]);
    }
  }
}
