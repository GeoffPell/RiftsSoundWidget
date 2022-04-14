import * as utils from "./utils.js";

export function isMeleeWeapon(msg){    
    var weapons = ['sword', 'axe', 'dagger', 'hammer'];
    var recived = msg;
    if (weapons.some(function(v) { return recived.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}

export function handleMeleeSound(message){
    var alias = isWeapon(message['speaker']['alias'])
    var male = isMasculineChar(alias)

    playSound("1496009")
    
    // is hit
    // is miss
    // is fumble
    // is crit
}