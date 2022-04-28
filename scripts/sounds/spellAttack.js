



import { playSound } from "../utils.js";
import { msgContains } from "../utils.js";
import * as sounds from './syrinSounds.js';

// var possibles = ['poison', 'fire', 'cold', 'force', 'lightning', 'thunder', 'necrotic', 'psychic', 'radiant'];

// function isBowSound(msg){
//     msg = msg.toLowerCase()
//     var possibles = ['sling', 'bow', 'dart', 'blow']; 
//     return msgContains(msg, possibles)
// }

// export function isMagicAttack(msg){    
//     msg = msg.toLowerCase()
//     var possibles = ['eldritch blast', 'bow', 'dart', 'blow', 'javelin']; 
//     return msgContains(msg, possibles)
// }

// export function isMagicDamage(msg){  
//     return isRangedWeapon(msg)
// }
  
export async function handleMagicAtack(message, hitDetail){
    // var alias = isRangedWeapon(message['speaker']['alias'])
    var flavor = message["flavor"].toLowerCase()

    switch (flavor){
        case "eldritch blast":
            playSound(sounds.eldritch_blast)
            break;

        case "toll the dead":
            playSound(sounds.toll_the_dead)
            break;
    }
    
    if (hitDetail.fumble) {
        playSound(sounds.sound_combat_automaticMiss)
    }
}

export async function handleMagicDamage(message, damageDetail, hitDetail){
    // var alias = isMeleeWeapon(message['speaker']['alias'])
    var flavor = message["flavor"]

    var isCrit = false
    if (hitDetail != null && hitDetail.crit){
        isCrit = true
        playSound(sounds.destruction)
        playSound(sounds.critical_hit_decoration)
        return
    }

    // is hit
    if (damageDetail.damage >= 0){
        playSound(sounds.sound_combat_humanoidGrunt)
    } else {
        // immune?
        // is miss
        playSound(sounds.destruction)
    }
    
}
