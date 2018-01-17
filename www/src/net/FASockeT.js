var P2P_PORT = 6969;
var EVENT_BROADCAST_PORT = 1214;
var SERVER_PORT = 8080;
var HTTP_MODE = "http://";

function FASockeT(ip){
  this.serverIp = ip;
  this.p2pPort = P2P_PORT;
  this.eventPort = EVENT_BROADCAST_PORT;
  this.serverPort = SERVER_PORT;
  this.httpMode = HTTP_MODE;

  this.EMIT = [];

  var opts = {peerOpts: {trickle: false}, autoUpgrade: false};

  this.init = function(){
    this.serverSocket = io(this.httpMode + this.serverIp + ':' + this.serverPort);
    //this.broadcastSocket = io(this.httpMode + this.serverIp + this.eventPort);
    //Add server behavior
    this.addOnServerCallback(PROTOCOL.FAST_MINI_GAME_REGISTER, this.startP2PSession);
    this.addOnServerCallback(PROTOCOL.TEST, function(data){console.log(JSON.stringify(data))});
    this.addOnServerCallback(PROTOCOL.FAST_EVENT_BROADCAST, function(data){console.log(JSON.stringify(data))});


    var emitable = PROTOCOL.getEmitableEvent();

    for(var evt in emitable){
      this.addEmitServerBehavior(emitable[evt]);
    }

  }

  //keyword : string, behavior : function
  this.addEmitServerBehavior = function(keyword){
    this.EMIT[keyword] = (data) => {
      this.serverSocket.emit(keyword, data);
    };
  }

  //keyword : string, callback : function
  this.addOnServerCallback = function(keyword, callback){
    // => ou : ??
      this.serverSocket.on(keyword, function(data){
        callback(data);
      });
  }

  //keyEvent : string, phaserSignal : Phaser.Signal
  this.addBroadcastCallback = function(keyEvent, phaserSignal){
    this.broadcastSocket.on(keyEvent, function(data){
      if(phaserSignal.dispatch){
        phaserSignal.dispatch(data);
      }
    });
  }

  //room : string
  this.startP2PSession = function(room){
    //is room usefull????
    this.p2psocket.upgrade();
  }

}
