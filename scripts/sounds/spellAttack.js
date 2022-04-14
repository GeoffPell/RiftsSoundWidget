function isSpellAttack(msg){    
    var weapons = ['acid splash'];
    var recived = msg;
    if (weapons.some(function(v) { return recived.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}
  
function isMagicalDamage(msg){
    return false
}