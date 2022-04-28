



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

function playSchoolDefault(school){
    console.log("playSchoolDefault " + school)
    switch(school){
        case "con":            
            playSound(sounds.sorc_level_6)
            break;

        case "nec":
            playSound(sounds.warlock_level_1)
            break;

        case "evo":
            playSound(sounds.wizard_level_4)
            break;

        case "abj":
            playSound(sounds.warlock_level_1)
            break;

        case "tra":
            playSound(sounds.paladin_level_3)
            break;

        case "div":
            playSound(sounds.cleric_level_0)
            break;

        case "enc":
            playSound(sounds.warlock_level_1)
            break;

        case "ill":
            playSound(sounds.warlock_hypnotic_pattern)
            break;

        default:
    }
}
  
export async function handleMagicAttack(spellName, school, fumble, targetDetail){
    console.log("spellName " + spellName + " ;" + school)

    switch (spellName.toLowerCase()){
        case "eldritch blast":
            playSound(sounds.eldritch_blast)
            break;

        case "toll the dead":
            playSound(sounds.toll_the_dead)
            break;

        default:
            playSchoolDefault(school)
    }
    
    if (fumble) {
        playSound(sounds.sound_combat_automaticMiss)
    }
}

export async function handleMagicDamage(spellName, school, damageDetail, damageValue, critical, targetDetail){

    // console.log("spellName: " + spellName); 
    // console.log("school: " + school); 
    // console.log("damageDetail: " + damageDetail.parts); 
    // console.log("damageValue: " + damageValue); 
    // console.log("critical: " + critical); 
    // console.log("targetDetail: " + targetDetail.name); 

    if (damageValue == null){
        damageValue = 1
    }

    try{
        damageDetail = damageDetail.parts[0][1]
        console.log("damageDetail: " + damageDetail); 
    } catch {

    }
    

    if (critical){
        playSound(sounds.destruction)
        playSound(sounds.critical_hit_decoration)
    }

    // is hit
    if (damageValue >= 0){
        // playSound(sounds.sound_combat_humanoidGrunt)
        playSound(sounds.sound_combat_hitFlesh)
    } else {
        // immune?
        // is miss
        playSound(sounds.destruction)
    }
    
}
