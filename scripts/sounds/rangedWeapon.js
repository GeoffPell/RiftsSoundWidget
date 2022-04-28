import { playSound } from "../utils.js";
import { msgContains } from "../utils.js";
import * as sounds from './syrinSounds.js';

function isBowSound(msg){
    msg = msg.toLowerCase()
    var possibles = ['sling', 'bow', 'dart', 'blow']; 
    return msgContains(msg, possibles)
}

export function isRangedWeapon(msg){    
    msg = msg.toLowerCase()
    var possibles = ['sling', 'bow', 'dart', 'blow', 'javelin']; 
    return msgContains(msg, possibles)
}

export function isRangedDamage(msg){  
    return isRangedWeapon(msg)
}
  
export async function handleRangedSwoosh(weaponName, weaponType, fumble, targetDetail){    
    
    if (isBowSound(weaponName)){
        playSound(sounds.sound_combat_bowFire)
    } else {
        playSound(sounds.sound_combat_throw)
    }
    
    if (fumble) {
        playSound(sounds.sound_combat_automaticMiss)
    }
}

export async function handleRangedDamage(weaponName, weaponType, damageDetail, damageValue, critical, targetDetail){

    damageDetail = damageDetail.parts[0][1]
    console.log("idamageDetail: " + damageDetail); 

    if (critical){
        playSound(sounds.critical_hit_decoration)
    }

    // is hit
    if (damageValue >= 0){
        if (isBowSound(weaponName)){
            if (critical){
                playSound(sounds.sound_combat_bowCrit)
            } else {
                playSound(sounds.sound_combat_bowHitFlesh)
            }
        } else {
            playSound(sounds.sound_combat_hitFlesh)
        }
        
    } else {
        // immune?
        // is miss
        playSound(sounds.sound_combat_bowHitWood)
    }
    
}
