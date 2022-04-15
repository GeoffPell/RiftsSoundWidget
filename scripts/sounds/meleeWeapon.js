import { playSound } from "../utils.js";
import { msgContains } from "../utils.js";

var sound_combat_automaticMiss = "1497024"
var sound_combat_bite = "424292"

var gemeric_slash = "424274"
var sound_combat_long_blade_slash = "2477"
var sound_combat_long_blade_hit = "2782"
var sound_combat_long_blade_crit = "2781"
var sound_combat_short_blade_slash = "2476"
var sound_combat_short_blade_hit = "2474"
var sound_combat_short_blade_crit = "2479"

var pole_arm_slash = "171901"


var generic_weapon_hit = "2782"
var critical_hit_decoration = "1496012"

var friendly_takes_bloody_hit = "1497021" 

var monster_dying_gasp = "1193514"


var sound_combat_bowDraw = "2478"
var sound_combat_bowFire = "2480"
var sound_combat_bowCrit = "2481"


var sound_combat_whip = ""
var sound_combat_hitFlesh = "1496009"
var sound_combat_hitFlesh2 = "424293"

var sound_impact_miss_invulnerable_resistant = "1282"
var sound_impact_dull_invulnerable_resistant = "1312"

var improvised_slam_attack = "1197"
var unarmed_punch_attack = "147650"


var sound_combat_monsterAttack = ""
var sound_combat_humanoidGrunt = "162538"
var sound_combat_npcDamageHit = ""
var sound_combat_npcDying = ""
var sound_combat_pcDamageHit = ""
var sound_combat_pcDamageHit_female = "273961"
var sound_combat_pcDamageHit_male = "273962"
var sound_combat_pcDeath = "271386"
var sound_combat_pcDeathSavingCriticalFail = "269452"
var sound_combat_pcDeathSavingCriticalSuccess = "1959"
var sound_combat_pcUnconciousScream_Male = "81758"
var sound_combat_pcUnconciousScream_Female = "81757"
var sound_combat_pcUnconciousStabalised = "1496026"
var sound_combat_pcUnconcious = ""
var sound_combat_shieldBlock = ""
var sound_combat_blockedByArmor = ""
var sound_combat_blockedByArmor2 = "5819"

var sound_combat_bludgeonSwing = ""
var sound_combat_systemShock = ""
var sound_combat_horrorHit = "49498"

// var sound_combat_takeDamage = ""
var sound_combat_throw = ""

var sound_male_pain_scream = "1033"
var sound_male_Exertion = "2462"
var sound_male_Growl = "2461"
var sound_male_Thoughtful = "2465"
var demonic_laugh_taunt = "49422"
var fiend_hiss = "986"
var fiend_hiss2 = "144269"

var devil_hisses = "20343"
var devil_growls = "20344"
var devil_speech = "20345"

var undead_hiss = "147668"
var undead_vocalise = "162556"
var undead_wails = "1034"
var zombie = "4403"
var giant_undead_vocal = "1467"

var banshee_wail = "327998"
var banshee_attack = "331918"

var werewolf_howl = "4393"
var werewolf_growl = "4396"

var Otyugh_attacks = "217074"

var goblin_vocal = "4398"
var ogre_orc_grunts = "331995"
var orc_attack = "274267"

var stirge_screech = "424275"

var wild_beast_attack = "225405"
var wild_beast_growl = "225406"
var wild_beat_vocal = "1430"
var wild_beast_ape_vocal = "4756"
var dino_roar = "4757"
var wolf_attack = "265797"

var small_monster_sqark = "144201"
var small_monster_growl = "162546"
var small_monster_vocalise = "162553"

var small_monster_hiss = "162547"
var small_monster_hiss2 = "162549"
var small_monster_hiss3 = "162552"


var medium_monster_roar = "331996"
var medium_monset_voice = "331919"
var medium_monster_attack_hiss = "171837"

var domestic_animal_pain = "144330"
var domestic_animal_squawk = "162555"

var teleport_fire_arival = "20314"
var teleport_activate = "20317"

var big_monster_roar = "144263"
var big_monster_roar2_displacing = "162496"
var big_monster_roar3_dragon = "162590"
var big_monster_attack_voice = "273968"
var big_monster_attack_voice2 = "273982"

var fire_breath = "162576"
var weakening_breath = "162591"

var ominous_drum = "144208"
var acid_spray = "144260"
var sound_wasps_insect_spell = "225392"

var destructioon = "4395"


export function isMeleeWeapon(msg){   
    msg = msg.toLowerCase()
    var possibles = ['sword', 'axe', 'dagger', 'hammer']; 
    return msgContains(msg, possibles)
}

export function isPoleArm(msg){   
    msg = msg.toLowerCase()
    var possibles = ['glaive', 'halberd', 'spear', "pike", "poleaxe"]; 
    return msgContains(msg, possibles)
}

export function isBludgeon(msg){   
    msg = msg.toLowerCase()
    var possibles = ['hammer', 'club', 'maul', "mace", "flail"]; 
    return msgContains(msg, possibles)
}

export function isSlashingSound(msg){       
    msg = msg.toLowerCase()
    var possibles = ['sword', 'axe', 'dagger']; 
    return msgContains(msg, possibles)
}

export function isPhysicalDamage(msg){
    msg = msg.toLowerCase()
    var possibles = ['slashing', 'bludgeoning', 'piercing']; 
    return msgContains(msg, possibles)
}

export async function handleMeleeSwoosh(message, hitDetail){
    var alias = isMeleeWeapon(message['speaker']['alias'])
    var flavor = message["flavor"]
    
    console.log("polay swoosh " + flavor)
    if (isSlashingSound(flavor)){
        console.log("slash sound")
        playSound(sound_combat_long_blade_slash)
    } else if (isPoleArm(flavor)) {
        console.log("PoleArm sound")
        playSound(pole_arm_slash)
    } else if (isBludgeon(flavor)) {
        console.log("Bludgeon sound")
        playSound(sound_combat_bludgeonSwing)
    } else {
        console.log("generic sound")
        playSound(gemeric_slash)
    }
    
    if (hitDetail.fumble) {
        playSound(sound_combat_automaticMiss)
    }
}

export async function handleMeleeDamage(message, damageDetail, hitDetail){
    var alias = isMeleeWeapon(message['speaker']['alias'])
    var flavor = message["flavor"]
    // console.log("polay damage damageDetail:  " + JSON.stringify(damageDetail) + " hitDetail " + JSON.stringify(hitDetail))
    // var male = isMasculineChar(alias)
    // console.log("message: " + message) 
    var isCrit = false
    if (hitDetail != null && hitDetail.crit){
        isCrit = true
        playSound(sound_combat_long_blade_crit)
        playSound(critical_hit_decoration)
        return
    }

    // is hit
    if (damageDetail.damage >= 0){
        if (isSlashingSound(flavor)){
            console.log("slash dmg sound")
            playSound(sound_combat_long_blade_hit)            
        } else if (isPoleArm(flavor)) {
            console.log("pole dmg sound")
            playSound(sound_combat_short_blade_hit)
        } else if (isBludgeon(flavor)) {
            console.log("bludge dmg sound")
            playSound(sound_combat_hitFlesh)
        } else {
            console.log("generic dmg sound")
            playSound(sound_combat_hitFlesh)
        }
        
    } else {
        // immune?
        // is miss
        playSound(sound_impact_dull_invulnerable_resistant)
    }
    
}
