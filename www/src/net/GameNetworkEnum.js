var GAMENETWORKENUM = [];

GAMENETWORKENUM[MINIGAMELIST.FAST_GAME_FIRE] = {
    'id' : MINIGAMELIST.FAST_GAME_FIRE,
    'emit' : [
        PROTOCOL.FAST_PRIVATE_SYNC
    ],
    'on' : [
        PROTOCOL.FAST_PRIVATE_SYNC
    ]
  };

GAMENETWORKENUM[MINIGAMELIST.FAST_GAME_METEOR] = {
    'id' : MINIGAMELIST.FAST_GAME_METEOR,
    'emit' : [
        PROTOCOL.FAST_GAME_METEOR_DAMAGE
    ],
    'on' : [

    ]
  };

GAMENETWORKENUM[MINIGAMELIST.FAST_GAME_SWITCH] = {
    'id' : MINIGAMELIST.FAST_GAME_SWITCH,
    'emit' : [

    ],
    'on' : [

    ]
  };

  GAMENETWORKENUM[MINIGAMELIST.FAST_GAME_BALLISTIC] = {
      'id' : MINIGAMELIST.FAST_GAME_BALLISTIC,
      'emit' : [

      ],
      'on' : [

      ]
    };

GAMENETWORKENUM.BASEVENT = {
    'emit' : [
        PROTOCOL.FAST_GAME_END,
        PROTOCOL.FAST_GAME_INIT,
        PROTOCOL.FAST_GAME_START
    ],
    'on' : [

    ]
  };
