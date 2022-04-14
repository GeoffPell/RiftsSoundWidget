// import * as utils from "./utils.js";

export function isMeleeWeapon(msg){    
    var weapons = ['sword', 'axe', 'dagger', 'hammer'];
    var recived = msg;
    if (weapons.some(function(v) { return recived.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}

export async function handleMeleeSound(message, hitDetail){
    var alias = isMeleeWeapon(message['speaker']['alias'])
    // var male = isMasculineChar(alias)
    console.log("message: " + message) 
    
    // is hit
    if (hitDetail.hit){
        
        // is crit?


        playSound("1496009")
    } else if (hitDetail.fumble) {
        // is fumble
        playSound("1497024")
    } else if (!hitDetail.hit) {
        // is miss
        playSound("1497020")
    }
    
}

export function isPhysicalDamage(msg){
    return true
}