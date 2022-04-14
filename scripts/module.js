import * as melee from "./meleeWeapon.js";
import * as ranged from "./rangedWeapon.js";
import * as spellAttack from "./spellAttack.js";
import * as spellUtil from "./spellUtil.js";

var authToken = ""

var ready = false
var load_time = Date.now ()
var last_id



var sound_combat_automaticMiss = ""
var sound_combat_bite = ""
var sound_combat_blade_slash = ""
var sound_combat_bowFire = ""
var sound_combat_whip = ""
var sound_combat_hitFlesh = ""
var sound_combat_monsterAttack = ""
var sound_combat_npcDamageHit = ""
var sound_combat_npcDying = ""
var sound_combat_pcDamageHit = ""
var sound_combat_pcDamageHit_female = ""
var sound_combat_pcDamageHit_male = ""
var sound_combat_pcDeath = ""
var sound_combat_pcDeathSavingCriticalFail = ""
var sound_combat_pcDeathSavingCriticalSuccess = ""
var sound_combat_pcUnconciousScream_Male = ""
var sound_combat_pcUnconciousScream_Female = ""
var sound_combat_pcUnconciousStabalised = ""
var sound_combat_pcUnconcious = ""
var sound_combat_shieldBlock = ""
var sound_combat_blockedByArmor = ""
var sound_combat_bludgeonSwing = ""
var sound_combat_systemShock = ""
// var sound_combat_takeDamage = ""
var sound_combat_throw = ""
//
var sound_event_levelUp = ""
var sound_event_LongRest = ""
var sound_event_ShortRest = ""
var sound_event_partyXp = ""
//
var sound_skill_Fail = ""
var sound_skill_Save = ""




Hooks.on("renderChatMessage", (message, data, html) => {
    if (!game.user.isGM){
        return
    }

    if (!ready){
        // console.log("load_time" + load_time)
        // console.log("Date.now ()" + Date.now ())
        if (Date.now () >= (load_time + 5000)) {
            ready = true
        } else {
            // console.log("bounce")
            return
        }
    }
    
    // console.log("HELLO renderChatMessage " + typeof(message))
    console.log("message." + JSON.stringify(message));
    // console.log("data." + JSON.stringify(data));
    

    var parsed = JSON.parse(JSON.stringify(message));
    if (parsed._id == last_id){
        return 
    }

    last_id = parsed._id

    considerCombatMessage(parsed)
  });



function considerCombatMessage(message){
    // if (message['flags']['midi-qol']){

    // }
    
    // console.log("flavor " + message['flavor'])
    var flavor = message['flavor']
    if (flavor != null){
        
        if (isMeleeWeapon(flavor)){
            handleMeleeSound(message)            
        } else if (isRangedWeapon(flavor)){

        } else if (isSpellAttack(flavor)){

        } else if (isSpellUtil(flavor)){

        }

        return
    }

    alias = isWeapon(message['speaker']['alias'])

    // is damage roll
    var dmgroll_sig = ""
    if (dmgroll_sig != null){
        if (isPhysicalDamage(dmgroll_sig)){
            // normal
            // crit
        } else if (isMagicalDamage()){
            // single
            // multi
        } else {

        }
    }


    var save_or_skill = ""
    if (save_or_skill != null){
        // pass
        // fail
        // crit
        // fumble
    }

}


