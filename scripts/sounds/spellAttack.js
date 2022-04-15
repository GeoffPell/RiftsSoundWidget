import { playSound } from "../utils.js";
import { msgContains } from "../utils.js";

function isSpellAttack(msg){    
    var weapons = ['acid splash'];
    var recived = msg;
    if (weapons.some(function(v) { return recived.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}
  
export function isMagicalDamage(msg){
    var possibles = ['poison', 'fire', 'cold', 'force', 'lightning', 'thunder', 'necrotic', 'psychic', 'radiant']; 
    return msgContains(msg, possibles)
}