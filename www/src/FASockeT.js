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

  this.init = function(){
    this.serverSocket = io(this.httpMode + this.serverIp + this.serverPort);
    //Add server behavior
    this.addOnServerCallback(PROTOCOL.FAST_MINI_GAME_REGISTER, this.startP2PSession);
  }

  //keyword : string, callback : function
  this.addOnServerCallback = function(keyword, callback){
    // => ou : ??
      this.serverSocket.on(keyword, function(data) => {
        callback(data);
      });
  }

  //callback : string
  this.addBroadcastCallback = function(callback){

  }

  //room : string
  this.startP2PSession = function(room){

  }

  this.

}
