'use strict'

module.exports = function MysticAutoBuff(mod) {
    let player_location = {};
    let sent = false;


    mod.hook('S_SPAWN_ME', 3, (event) => {
        player_location.loc = event.loc;
        player_location.w = event.w;
    });

    mod.hook('C_PLAYER_LOCATION', 5, (event) => {
        player_location.loc = event.loc;
        player_location.w = event.w;
    });
    
    mod.hook('S_SPAWN_ME', 3, (event) => {
        setTimeout(
            () => {
                mod.send('C_START_SKILL', 7, {
                    skill: {
                        id: 450100,
                        reserved: 0,
                        npc: false,
                        type: 1,
                        huntingZoneId: 0
                    },
                    w: player_location.w,
                    loc: player_location.loc,
                    dest: player_location.loc,
                    unk: true,
                    moving: false,
                    continue: false,
                    target: 0,
                    unk2: false
                });
            }, 1000);
    });
}

