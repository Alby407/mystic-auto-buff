'use strict'


/**
 * Creates a skill object with the specified skill id and the location of the player.
 * @param skill_id
 * @param player_location
 * @returns {{loc: *, unk: boolean, continue: boolean, unk2: boolean, skill: {npc: boolean, reserved: number, huntingZoneId: number, id, type: number}, w: *, dest: *, moving: boolean, target: number}}
 */
function create_skill(skill_id, player_location) {
    return {
        skill: {
            id: skill_id,
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
    }
}


/**
 * Buffs the player after a given amount of delay in milliseconds.
 *
 * @param mod The TERA ToolBox module.
 * @param player_location The current player location as def `C_PLAYER_LOCATION`.
 * @param delay_ms The delay in ms after which the buff should be activated.
 */
function buff(mod, player_location, delay_ms, skill_id, job) {
	if (job == 7) {
		setTimeout(
			() => {
				mod.send('C_START_SKILL', 7, create_skill(skill_id, player_location));
			}, delay_ms);
	}
}

module.exports = function MysticAutoBuff(mod) {
    let player_location = {};
	let job;
	let model;
	
	script.hook('S_LOGIN', 14, (packet) => {
		model = packet.templateId;
		job = (model - 10101) % 100;
	})

    mod.hook('C_PLAYER_LOCATION', 5, (event) => {
        player_location.loc = event.loc;
        player_location.w = event.w;
    });

    mod.hook('C_REVIVE_NOW', 2, (event) => {
	buff(mod, player_location, 1000, 450100, job);
	buff(mod, player_location, 2000, 130400, job);
	buff(mod, player_location, 4000, 160100, job);
    });

//    mod.hook('S_SPAWN_ME', 3, (event) => {
//        player_location.loc = event.loc;
//        player_location.w = event.w;
//        buff(mod, player_location, 1000, 450100);
//        buff(mod, player_location, 2000, 130400);
//        buff(mod, player_location, 4000, 160100);
//    });
}
