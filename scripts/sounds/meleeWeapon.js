import { playSound } from "../utils.js";
import { msgContains } from "../utils.js";
import * as sounds from './syrinSounds.js';


var slashing = ['sword', 'axe', 'dagger', 'hammer']; 
var poleArms = ['glaive', 'halberd', 'spear', "pike", "poleaxe"]; 
var bludgeon = ['hammer', 'club', 'maul', "mace", "flail"]; 

export function isMeleeWeapon(msg){   
    msg = msg.toLowerCase()
    return msgContains(msg, slashing)
}

export function isPoleArm(msg){   
    msg = msg.toLowerCase()
    return msgContains(msg, poleArms)
}

export function isBludgeon(msg){   
    msg = msg.toLowerCase()
    return msgContains(msg, bludgeon)
}

export function isSlashingSound(msg){       
    msg = msg.toLowerCase()
    return msgContains(msg, slashing)
}

export function isMeleeDamage(msg){
    if (isMeleeWeapon(msg) || isPoleArm(msg) || isBludgeon(msg) ){
        return true
    }
    return false
}

export async function handleMeleeSwoosh(weaponName, weaponType, fumble, targetDetail){
    
    if (isSlashingSound(weaponName)){
        playSound(sounds.sound_combat_long_blade_slash)
    } else if (isPoleArm(weaponName)) {
        playSound(sounds.pole_arm_slash)
    } else if (isBludgeon(weaponName)) {
        playSound(sounds.sound_combat_bludgeonSwing)
    } else {
        playSound(sounds.gemeric_slash)
    }
    
    if (fumble) {
        playSound(sounds.sound_combat_automaticMiss)
    }
}

export async function handleMeleeDamage(weaponName, weaponType, damageDetail, damageValue, critical, targetDetail){

    damageDetail = damageDetail.parts[0][1]
    console.log("idamageDetail: " + damageDetail); 

    if (critical){
        // playSound(sounds.sound_combat_long_blade_crit)
        playSound(sounds.critical_hit_decoration)
    }

    // is hit
    if (damageValue >= 0){
        if (isSlashingSound(weaponName)){
            if (critical){
                playSound(sounds.sound_combat_long_blade_crit)
            } else {
                playSound(sounds.sound_combat_long_blade_hit)            
            }

        } else if (isPoleArm(weaponName)) {

            if (critical){
                playSound(sounds.sound_combat_long_blade_crit)
            } else {
                playSound(sounds.sound_combat_long_blade_hit)            
            }

            playSound(sounds.sound_combat_short_blade_hit)
        } else if (isBludgeon(weaponName)) {

            if (critical){
                playSound(sounds.sound_combat_long_blade_crit)
            } else {
                playSound(sounds.sound_combat_long_blade_hit)            
            }

            playSound(sounds.sound_combat_hitFlesh)
        } else {

            playSound(sounds.sound_combat_hitFlesh)
        }
        
    } else {
        // immune?
        // is miss
        playSound(sounds.sound_impact_dull_invulnerable_resistant)
    }
    
}
