//Take a given minigame event enum
//add all emitable event as emit to the main socket
//add all onable event as on to the main socket
//When destroy is called, all callback are removed from the socket
function EventAdapter(mgenum, fastSocket){

  this.destroy = function(){
    
  };
}
