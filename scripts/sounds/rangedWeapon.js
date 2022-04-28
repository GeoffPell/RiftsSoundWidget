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
  
export async function handleRangedSwoosh(message, hitDetail){
    // var alias = isRangedWeapon(message['speaker']['alias'])
    var flavor = message["flavor"]
    
    if (isBowSound(flavor)){
        playSound(sounds.sound_combat_bowFire)
    } else {
        playSound(sounds.sound_combat_throw)
    }
    
    if (hitDetail.fumble) {
        playSound(sounds.sound_combat_automaticMiss)
    }
}

export async function handleRangedDamage(message, damageDetail, hitDetail){
    // var alias = isMeleeWeapon(message['speaker']['alias'])
    var flavor = message["flavor"]

    var isCrit = false
    if (hitDetail != null && hitDetail.crit){
        isCrit = true
        playSound(sounds.sound_combat_bowCrit)
        playSound(sounds.critical_hit_decoration)
        return
    }

    // is hit
    if (damageDetail.damage >= 0){
        if (isBowSound(flavor)){
            playSound(sounds.sound_combat_bowHitFlesh)   
        } else {
            playSound(sounds.sound_combat_hitFlesh)
        }
        
    } else {
        // immune?
        // is miss
        playSound(sounds.sound_combat_bowHitWood)
    }
    
}
