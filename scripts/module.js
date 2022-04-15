import { registerSettings } from "./settings.js";
// import { registerHooks } from "./hooks.js";
import { packageId } from "./config.js";
//
import { isMeleeWeapon } from "./sounds/meleeWeapon.js";
import { handleMeleeSwoosh } from "./sounds/meleeWeapon.js";
import { handleMeleeDamage } from "./sounds/meleeWeapon.js";
import { isPhysicalDamage } from "./sounds/meleeWeapon.js"; 
import { playSound } from "./utils.js";
import { isObjectEmpty } from "./utils.js";

import { quePushIdWithDmg } from "./messageQue.js";
import { quePushIdWithAtk } from "./messageQue.js";
import { queHasIdWithDmg } from "./messageQue.js";
import { queHasIdWithAtk } from "./messageQue.js";

// import * as ranged from "./sounds/rangedWeapon.js";
// import * as spellAttack from "./sounds/spellAttack.js";
// import * as spellUtil from "./sounds/spellUtil.js";


var ready = false
var load_time = Date.now ()
var last_id = []

Hooks.once("init", function () {
    registerSettings();
})


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
    // console.log("message." + JSON.stringify(message));
    // console.log("data." + JSON.stringify(data));
    var parsed = JSON.parse(JSON.stringify(message));
    considerCombatMessage(parsed)
  });


function getHitDetail(message){
    var hitDetail = {}
    if (message['flags'] != null){
        if (message['flags']['midi-qol'] != null){
            if (message['flags']['midi-qol']['isHit'] != null){
                var hit = message['flags']['midi-qol']['isHit']
                var fumble = message['flags']['midi-qol']['isFumble']
                var crit = false
                if (message['flags']['midi-qol']['isCritical'] != null){
                    crit = true
                } 
                hitDetail = {hit: hit, fumble: fumble, crit: crit}
            } 
        }
    }
    return hitDetail
}


function getDamageDetailMessage(message){
    var damageDetail = {}
    if (message['flags'] != null){
        if (message['flags']['midi-qol'] != null){
            if (message['flags']['midi-qol']['damageDetail'] != null){
                var damageDetail = message['flags']['midi-qol']['damageDetail'][0]
                var damageDetailParsed = JSON.parse(JSON.stringify(damageDetail))
                damageDetail = JSON.parse(JSON.stringify(damageDetailParsed))
            } 
        }
    }
    return damageDetail
}


export async function considerCombatMessage(message){      

    var hitDetail = getHitDetail(message)
    var damageDetail = getDamageDetailMessage(message)

    if (isObjectEmpty(hitDetail) && isObjectEmpty(damageDetail)){
        return
    }


    if (!isObjectEmpty(hitDetail)){
        if (!queHasIdWithAtk(message._id)){
            quePushIdWithAtk(message._id)
            handleAttackSound(message, hitDetail)
        }
    } 

    if (!isObjectEmpty(damageDetail)){
        if (!queHasIdWithDmg(message._id)){
            quePushIdWithDmg(message._id)
            handleDamageSound(message, damageDetail, hitDetail)
        }
    } 


    // var alias = message['speaker']['alias']


    var save_or_skill = ""
    if (save_or_skill != null){
        // pass
        // fail
        // crit
        // fumble
    }
}


function handleDamageSound(message, damageDetail, hitDetail){
    if (!isObjectEmpty(damageDetail)){        
        if (isPhysicalDamage(damageDetail.type)){
            handleMeleeDamage(message, damageDetail, hitDetail);
        // } else if (isMagicalDamage(damageDetail.type)){
        //     // single
        //     // multi
        // } else {
        }
    } else {
        // console.log("no damage - is it fumble?: " + hitDetail.fumble)
        handleMeleeSwoosh(message, hitDetail);
    }
}

function handleAttackSound(message, hitDetail){
    var flavor = message['flavor']
    if (flavor != null){
        if (isMeleeWeapon(flavor)){
            handleMeleeSwoosh(message, hitDetail)
            
            if (!hitDetail.isHit){
                // setTimeout(() => {handleMeleeSwoosh(message, hitDetail);}, 2000)
            }
                        
        // } else if (isRangedWeapon(flavor)){

        // } else if (isSpellAttack(flavor)){

        // } else if (isSpellUtil(flavor)){

        } else {
            console.log("not melee")
        }
        return
    }
}

// TODO resistance, vulnerability immunity
