import {isMeleeWeapon} from "./sounds/meleeWeapon.js";
import {handleMeleeSound} from "./sounds/meleeWeapon.js";
import { isPhysicalDamage } from "./sounds/meleeWeapon.js"; 
import * as utils from "./sounds/utils.js";
import * as ranged from "./sounds/rangedWeapon.js";
import * as spellAttack from "./sounds/spellAttack.js";
import * as spellUtil from "./sounds/spellUtil.js";


var ready = false
var load_time = Date.now ()
var last_id = []



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
        if (Date.now () >= (load_time + 5000)) {
            ready = true
        } else {
            return
        }
    }
    
    // console.log("HELLO renderChatMessage " + typeof(message))
    console.log("message." + JSON.stringify(message));
    // console.log("data." + JSON.stringify(data));
    var parsed = JSON.parse(JSON.stringify(message));
    considerCombatMessage(parsed)
  });


function getHitDetail(message){
    var hitDetail = {}
    if (message['flags'] != null){
        if (message['flags']['midi-qol'] != null){
            console.log("hit:" + hit)
            if (message['flags']['midi-qol']['isHit'] != null){
                var hit = message['flags']['midi-qol']['isHit']
                var fumble = message['flags']['midi-qol']['isFumble']
                console.log("hit:" + hit)
                hitDetail = {hit: hit, fumble: fumble}
            } 
        }
    }
    return hitDetail
}


function getDamageDetailMessage(message){
    var damageDetail = {}
    if (message['flags'] != null){
        if (message['flags']['midiqol'] != null){
            if (message['flags']['midiqol']['undoDamage'] != null){
                if (message['flags']['midiqol']['undoDamage'][0]['damageItem'] != null){
                    var damageItem = message['flags']['midiqol']['undoDamage'][0]['damageItem']
                    var damageItemParsed = JSON.parse(JSON.stringify(damageItem))
                    damageDetail = JSON.parse(JSON.stringify(damageItemParsed.damageDetail[0][0]))
                    var type = damageDetail.type;
                    // console.log("type:" + type)
                }
            } 
        }
    }
    return damageDetail
}


export async function considerCombatMessage(message){      
    var hitDetail = getHitDetail(message)

    if (!isObjectEmpty(hitDetail)){
        return
    }

    if (last_id.includes(message._id)){
        return 
    }
    last_id.push(message._id)
    if (last_id.length > 3){
        last_id.unshift()
    }


    
    var damageDetail = getDamageDetailMessage(message)
    
    console.log("hitDetail " + JSON.stringify(hitDetail))
    console.log("damageDetail " + JSON.stringify(damageDetail))
    var flavor = message['flavor']
    if (flavor != null){
        
        if (isMeleeWeapon(flavor)){
            setTimeout(() => {handleMeleeSound(message, hitDetail);}, 0)
                        
        // } else if (isRangedWeapon(flavor)){

        // } else if (isSpellAttack(flavor)){

        // } else if (isSpellUtil(flavor)){

        }

        return
    }

    // var alias = message['speaker']['alias']

    // is damage roll
    if (!isObjectEmpty(damageDetail)){        
        // if (isPhysicalDamage(damageDetail.type)){
            playSound("1497021")
            // normal
            // crit
        // } else if (isMagicalDamage(damageDetail.type)){
        //     // single
        //     // multi
        // } else {
        // }
    } else {
        playSound("1497020")
    }


    var save_or_skill = ""
    if (save_or_skill != null){
        // pass
        // fail
        // crit
        // fumble
    }

}


