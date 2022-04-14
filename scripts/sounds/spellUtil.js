function isSpellUtil(msg){    
    var weapons = ['healing word'];
    var recived = msg;
    if (weapons.some(function(v) { return recived.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}
  