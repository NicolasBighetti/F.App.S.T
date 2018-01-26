var P2P_PORT = 6969;
var EVENT_BROADCAST_PORT = 1214;
var SERVER_PORT = 8080;
var HTTP_MODE = "http://";

//Object are stringified upon emission
//Object are parsed upon callback call
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

    //TODO : change this
    //TEMPORARY
    this.broadcastSocket = this.serverSocket;

    //Add server behavior
    this.addOnServerCallback(PROTOCOL.FAST_MINI_GAME_REGISTER, this.startP2PSession);


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
  this.addOnServerCallback = function(keyword, callback, signal){
    if(signal){
      this.serverSocket.on(keyword, function(data){
        signal.dispatch(data);
      });
    }
    else{
      this.serverSocket.on(keyword, function(data){
        callback(data);
      });
    }
  }

  this.removeOnServerCallback = function(keyword, callback){
    this.serverSocket.removeListener(keyword, callback);
  }

  //keyEvent : string, phaserSignal : Phaser.Signal
  this.addBroadcastCallback = function(keyEvent, phaserSignal){
    this.broadcastSocket.on(keyEvent, function(data){
      if(phaserSignal.dispatch){
        phaserSignal.dispatch({'data' : data});
      }
    });
  }

  //room : string
  this.startP2PSession = function(room){
    //is room usefull????
    this.p2psocket.upgrade();
  }

}
