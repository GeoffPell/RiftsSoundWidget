



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
  
export async function handleMagicAttack(spellName, school, fumble, targetDetail){
    switch (spellName){
        case "eldritch blast":
            playSound(sounds.eldritch_blast)
            break;

        case "toll the dead":
            playSound(sounds.toll_the_dead)
            break;
    }
    
    if (fumble) {
        playSound(sounds.sound_combat_automaticMiss)
    }
}

export async function handleMagicDamage(spellName, school, damageDetail, damageValue, critical, targetDetail){

    damageDetail = damageDetail.parts[0][1]
    console.log("idamageDetail: " + damageDetail); 

    if (critical){
        playSound(sounds.destruction)
        playSound(sounds.critical_hit_decoration)
    }

    // is hit
    if (damageValue >= 0){
        playSound(sounds.sound_combat_humanoidGrunt)
    } else {
        // immune?
        // is miss
        playSound(sounds.destruction)
    }
    
}
