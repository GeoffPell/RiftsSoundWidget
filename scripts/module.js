import { registerSettings } from "./settings.js";
// import { registerHooks } from "./hooks.js";
import { packageId } from "./config.js";
import { isObjectEmpty } from "./utils.js";
//
import { isMeleeWeapon } from "./sounds/meleeWeapon.js";
import { handleMeleeSwoosh } from "./sounds/meleeWeapon.js";
import { handleMeleeDamage } from "./sounds/meleeWeapon.js";
import { isMeleeDamage } from "./sounds/meleeWeapon.js"; 

import { isRangedWeapon } from "./sounds/rangedWeapon.js";
import { isRangedDamage } from "./sounds/rangedWeapon.js";
import { handleRangedSwoosh } from "./sounds/rangedWeapon.js";
import { handleRangedDamage } from "./sounds/rangedWeapon.js";

import { handleMagicAtack } from "./sounds/spellAttack.js";
import { handleMagicDamage } from "./sounds/spellAttack.js";


// import * as ranged from "./sounds/rangedWeapon.js";
// import * as spellAttack from "./sounds/spellAttack.js";
// import * as spellUtil from "./sounds/spellUtil.js";



Hooks.once("init", function () {
    registerSettings();
})



Hooks.on("midi-qol.AttackRollComplete", workflow => {
    console.log("AttackRollComplete")
    console.log("isCritical: " + workflow.isCritical);
    console.log("isFumble: " + workflow.isFumble);
    console.log("hitTargets: " + workflow.hitTargets);
});

Hooks.on("midi-qol.preDamageRoll", workflow => {
    console.log("preDamageRoll")
    console.log("hitTargets: " + workflow.hitTargets);
    console.log("itemId: " + workflow.itemId);

    console.log("itemCardData: " + JSON.stringify(workflow.itemCardData));
    console.log("item: " + JSON.stringify(workflow.item));
    console.log("item.name: " + JSON.stringify(workflow.item.name));
    console.log("item.name: " + workflow.item.name); //Lopngsword, blast
    console.log("item.type: " + workflow.type); //spell, item
});




function handleDamageSound(message, damageDetail, hitDetail){
    var flavor = message['flavor']
    console.log("flavor " + flavor)
    if (!isObjectEmpty(damageDetail)){        
        if (isMeleeDamage(flavor)){
            handleMeleeDamage(message, damageDetail, hitDetail);
        } else if (isRangedDamage(flavor)){
            // console.log("isRangedDamage")
            handleRangedDamage(message, damageDetail, hitDetail);
        } else {
            // single
            // multi
            console.log("handleMagicDamage")
            handleMagicDamage(message, damageDetail, hitDetail)
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
        } else if (isRangedWeapon(flavor)){
            handleRangedSwoosh(message, hitDetail)     
        } else {
            console.log("handleMagicAtack")
            handleMagicAtack(message, hitDetail)
        }
        return
    }
}

// TODO resistance, vulnerability immunity
