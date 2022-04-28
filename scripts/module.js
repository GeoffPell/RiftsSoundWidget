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
    console.log("JSONhitTargets: " + JSON.stringify(workflow.hitTargets));

    console.log("item.name: " + workflow.item.name); //Lopngsword, blast
    console.log("item.type: " + workflow.item.type); //spell, item
    if (workflow.type == "spell"){
        console.log("item.data.level: " + workflow.item.data.level); 
        console.log("item.data.school: " + workflow.item.data.school); 
    }


    const targetDetails = workflow.item.data.data.target
    console.log("targetDetails: " + targetDetails); 

    if (Array.from(workflow.hitTargets).length >= 1){

        // console.log("targetDetails: " + JSON.stringify(targetDetails)); 
        console.log("hitTargets data: " + Array.from(workflow.hitTargets)[0].data);
        console.log("hitTargets name: " + Array.from(workflow.hitTargets)[0].data.name);
        let JSONactorId = JSON.stringify(Array.from(workflow.hitTargets)[0].data)
        console.log(JSONactorId);

        let actorId = Array.from(workflow.hitTargets)[0].data.actorId
        console.log(actorId);

        let actor = game.actors.get(actorId);
        let creatureType = actor.labels.creatureType;
        let cr = actor.data.data.details.cr;
        let size = actor.data.data.traits.size;
        console.log("creatureType: " + creatureType);
        console.log("cr: " + cr);
        console.log("size: " + size);
    }

    if (workflow.item.type == 'item'){
        handleMeleeSwoosh(workflow.item.name, workflow.isFumble)
    }



    // console.log([...letters]) 
    // const firstTarget = this.targets.values().next().value
    // console.log("firstTarget.actor: " + firstTarget.actor); 
});

Hooks.on("midi-qol.preDamageRoll", workflow => {
    console.log("preDamageRoll")
    // console.log("hitTargets: " + JSON.stringify(workflow.hitTargets));
    console.log("itemId: " + workflow.itemId);

    console.log("item: " + JSON.stringify(workflow.item));
    console.log("item.name: " + workflow.item.name); //Lopngsword, blast
    console.log("item.type: " + workflow.item.type); //spell, item
    if (workflow.item.type == "spell"){
        console.log("item.data.level: " + workflow.item.data.level); 
        console.log("item.data.school: " + workflow.item.data.school); 
    }

    if (workflow.item.type == "item"){
        console.log("item.data.weaponType: " + workflow.item.data.data.weaponType);
    }

    console.log("item.data.range: " + workflow.item.data.data.range.value); 
    console.log("item.data.damage: " + workflow.item.data.data.damage.parts[0][1]); 

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
