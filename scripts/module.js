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

import { handleMagicAttack } from "./sounds/spellAttack.js";
import { handleMagicDamage } from "./sounds/spellAttack.js";


// import * as ranged from "./sounds/rangedWeapon.js";
// import * as spellAttack from "./sounds/spellAttack.js";
// import * as spellUtil from "./sounds/spellUtil.js";



Hooks.once("init", function () {
    registerSettings();
})

function getTargetDetail(workflow){
    var targetDetail = {}
    const targetDetails = workflow.item.data.data.target

    if (Array.from(workflow.hitTargets).length >= 1){

        // console.log("targetDetails: " + JSON.stringify(targetDetails)); 
        // console.log("hitTargets data: " + Array.from(workflow.hitTargets)[0].data);
        var tname = Array.from(workflow.hitTargets)[0].data.name
        let actorId = Array.from(workflow.hitTargets)[0].data.actorId
        let actor = game.actors.get(actorId);
        let creatureType = actor.labels.creatureType;
        let cr = actor.data.data.details.cr;
        let size = actor.data.data.traits.size;
        // console.log("creatureType: " + creatureType);
        // console.log("cr: " + cr);
        // console.log("size: " + size);

        targetDetail = {name: tname, creatureType: creatureType, cr:cr, size:size }
    }

    return targetDetail
}

Hooks.on("midi-qol.preSave", workflow => {
    console.log("preSave")
});


Hooks.on("midi-qol.preDamageRoll", workflow => {
    console.log("preDamageRoll")
});

Hooks.on("midi-qol.damageRollComplete", workflow => {
    console.log("damageRollComplete")

});

Hooks.on("midi-qol.preApplyDynamicEffects", workflow => {
    // console.log("preApplyDynamicEffects")

    // if (workflow.item.type == "spell"){
    //     console.log("item.data.level: " + workflow.item.data.data.level); 
    //     console.log("item.data.school: " + workflow.item.data.data.school); 
    // }

    if (workflow.item.type == 'spell'){
        var targetDetail = getTargetDetail(workflow)
        // if (workflow.item.name == "toll the dead"){
            handleMagicAttack(workflow.item.name, workflow.item.data.data.school, workflow.isFumble, targetDetail)
        // }
        handleMagicDamage(workflow.item.name,  workflow.item.data.data.school, workflow.item.data.data.damage, workflow.damageTotal, workflow.isCritical, targetDetail)
    }
});


Hooks.on("midi-qol.AttackRollComplete", workflow => {
    // console.log("AttackRollComplete")
    // console.log("isCritical: " + workflow.isCritical);
    // console.log("isFumble: " + workflow.isFumble);
    // console.log("hitTargets: " + workflow.hitTargets);
    // console.log("JSONhitTargets: " + JSON.stringify(workflow.hitTargets));

    // console.log("item.name: " + workflow.item.name); //Lopngsword, blast
    // console.log("item.type: " + workflow.item.type); //spell, item
    // if (workflow.item.type== "spell"){
    //     console.log("item.data.level: " + workflow.item.data.level); 
    //     console.log("item.data.school: " + workflow.item.data.school); 
    // }


    
    // console.log("targetDetails: " + targetDetails); 
    var targetDetail = getTargetDetail(workflow)
    // console.log("item.type: " + workflow.item.type);

    if (workflow.item.type == 'weapon'){
        console.log("item.data.weaponType: " + workflow.item.data.data.weaponType);
        if (workflow.item.data.data.weaponType != "ranged"){
            handleMeleeSwoosh(workflow.item.name, workflow.item.data.data.weaponType, workflow.isFumble, targetDetail)
        } else {
            handleRangedSwoosh(workflow.item.name, workflow.item.data.data.weaponType, workflow.isFumble, targetDetail);
        }
    } else if (workflow.item.type == 'spell'){
        if (Array.from(workflow.hitTargets).length == 0){
            handleMagicAttack(workflow.item.name, workflow.item.data.data.school, workflow.isFumble, targetDetail)
        }
    }
});

Hooks.on("midi-qol.preDamageRollComplete", workflow => {
    // console.log("preDamageRollComplete")

    // console.log("isCritical: " + workflow.isCritical);
    // console.log("isFumble: " + workflow.isFumble);
    // console.log("damageTotal: " + JSON.stringify(workflow.damageTotal));
    // console.log("itemId: " + workflow.itemId);

    // console.log("workflow.item.data: " + JSON.stringify(workflow.item.data.data));
    // console.log("item.name: " + workflow.item.name); //Longsword, blast
    // console.log("item.type: " + workflow.item.type); //spell, item

    // if (workflow.item.type == "spell"){
    //     console.log("item.data.level: " + workflow.item.data.data.level); 
    //     console.log("item.data.school: " + workflow.item.data.data.school); 
    // }

    // if (workflow.item.type == "weapon"){
    //     console.log("item.data.weaponType: " + workflow.item.data.data.weaponType);
    // }

    // console.log("item.data.range: " + workflow.item.data.data.range.value); 
    // console.log("item.data.damage: " + workflow.item.data.data.damage.parts[0][1]); 

    var targetDetail = getTargetDetail(workflow)

    if (workflow.item.type == 'weapon'){
        // console.log("item.data.weaponType: " + workflow.item.data.data.weaponType);
        if (workflow.item.data.data.weaponType != "Ranged"){
            handleMeleeDamage(workflow.item.name, workflow.item.data.data.weaponType, workflow.item.data.data.damage, workflow.damageTotal, workflow.isCritical, targetDetail)
        } else {
            handleRangedDamage(workflow.item.name, workflow.item.data.data.weaponType, workflow.item.data.data.damage, workflow.damageTotal, workflow.isCritical, targetDetail);
        }
    }

    // if (workflow.item.type == 'spell'){
    //     handleMagicDamage(workflow.item.name,  workflow.item.data.school, workflow.item.data.data.damage, workflow.damageTotal, workflow.isCritical, targetDetail)
    // }

});


// TODO resistance, vulnerability immunity
