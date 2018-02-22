var GAMENETWORKENUM = {};

GAMENETWORKENUM[STATELIST.FAST_GAME_FIRE] = {
    'id' : STATELIST.FAST_GAME_FIRE,
    'emit' : [
        PROTOCOL.FAST_PRIVATE_SYNC
    ],
    'on' : [
        PROTOCOL.FAST_PRIVATE_SYNC
    ]
  };

GAMENETWORKENUM[STATELIST.FAST_GAME_METEOR] = {
    'id' : STATELIST.FAST_GAME_METEOR,
    'emit' : [
        PROTOCOL.FAST_GAME_METEOR_DAMAGE
    ],
    'on' : [

    ]
  };

GAMENETWORKENUM[STATELIST.FAST_GAME_SWITCH] = {
    'id' : STATELIST.FAST_GAME_SWITCH,
    'emit' : [

    ],
    'on' : [

    ]
  };

  GAMENETWORKENUM[STATELIST.FAST_GAME_BALLISTIC] = {
      'id' : STATELIST.FAST_GAME_BALLISTIC,
      'emit' : [

      ],
      'on' : [

      ]
    };

GAMENETWORKENUM[STATELIST.FAST_BOOT] = {
  'id' : STATELIST.FAST_BOOT,
  'emit' : [

  ],
  'on' : [

  ]
};

GAMENETWORKENUM[STATELIST.FAST_SPLASH] = {
  'id' : STATELIST.FAST_SPLASH,
  'emit' : [

  ],
  'on' : [

  ]
};

GAMENETWORKENUM[STATELIST.FAST_BOOT] = {
  'id' : STATELIST.FAST_BOOT,
  'emit' : [

  ],
  'on' : [

  ]
};

GAMENETWORKENUM[STATELIST.FAST_COLOR_IO] = {
  'id' : STATELIST.FAST_COLOR_IO,
  'emit' : [

  ],
  'on' : [

  ]
};

GAMENETWORKENUM[STATELIST.FAST_FALLBACK] = {
  'id' : STATELIST.FAST_FALLBACK,
  'emit' : [
      PROTOCOL.FAST_APP_ERROR
  ],
  'on' : [

  ]
};

GAMENETWORKENUM[STATELIST.FAST_STATUS_SCREEN] = {
  'id' : STATELIST.FAST_STATUS_SCREEN,
  'emit' : [

  ],
  'on' : [
    
  ]
};

GAMENETWORKENUM.BASEMINIGAMEEVENT = {
    'emit' : [
        PROTOCOL.FAST_GAME_END,
        PROTOCOL.FAST_GAME_INIT,
        PROTOCOL.FAST_GAME_START
    ],
    'on' : [
        PROTOCOL.FAST_GAME_END,
        PROTOCOL.FAST_GAME_INIT,
        PROTOCOL.FAST_GAME_START
    ]
  };
