function FastStateManager(game){

  this.game = game;

  this.killSignal = undefined;

  this.currentEventAdapter = undefined;

  this.goToState = function(state, param){
    //Control if state exist
    if(this.game.state.checkState(state)){
      //destroy old eventAdapter
      if(this.currentEventAdapter){
        this.currentEventAdapter.destroy();
      }
      //Create new eventAdapter
      this.currentEventAdapter = new EventAdapter(GAMENETWORKENUM[state], FastGame.fastSocket);

      if(this.killSignal){
        this.killSignal.dispose();
      }
      this.killSignal = undefined;
      this.killSignal = new Phaser.Signal();

      this.killSignal.addOnce(this.killSignal, this);

      //go to next state
      //first true is clear gameWorld (need some precisions)
      //second true is clear game cache (we want this)
      this.game.state.start(state, true, true, param);
    }
    //may throw some error or do somthing really, but I expect it not to happen
    console.err('State ' + state + ' not found, aborting state switch');
    return false;
  };


}
