
function PeerSocket(){

  this.init = function(){
    var opts = {peerOpts: {trickle: false}, autoUpgrade: false};
    this.signalRelay = new Phaser.Signal();
    this.p2psocket = new P2P(FastGame.fastSocket.serverSocket, opts, (res) => {
      this.signalRelay.dispatch();
    });


    var proto = PROTOCOL.getPrivatableEvent();
    for(var key in proto){
      this[proto[key]] = [];
      this[proto[key]].channel = new Phaser.Signal();
      this[proto[key]].emit = function(data){
        this.p2psocket.emit(proto[key], this.addHeader(data));
      };
      this[proto[key]].on = function(data){
        //TODO : use timestamp
        this[key].channel.dispatch(data.data);
      };
    }
    return this.signalRelay;
  }

  this.upgrade = function(){
    this.p2psocket.upgrade();
  }

  this.addHeader = function(data){

    return {
      'timestamp' : new Date.now(),
      'data' : data
    }

  }


}
