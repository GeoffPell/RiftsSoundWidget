function isRangedWeapon(msg){
    
    var weapons = ['sling', 'bow', 'dart'];
    var recived = msg;
    if (weapons.some(function(v) { return recived.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}
  