import { packageId } from "./constants.js";


export const registerSettings = function () {
    game.settings.register(packageId, "enable", {
      name: "Enable",
      default: true,
      scope: "client",
      type: Boolean,
      config: true
    });
  
    game.settings.register(packageId, "Syrinscape-Token", {
      name: "Syrinscape-Token",
      default: "",
      scope: "client",
      type: String,
      config: true
    });
  
    game.settings.register(packageId, "migration", {
      name: "CombatIds",
      default: [],
      scope: "client",
      type: Array,
      config: true
    });
  
};


var femaleChars = []




//
var sound_event_levelUp = ""
var sound_event_LongRest = ""
var sound_event_ShortRest = ""
var sound_event_partyXp = ""
//
var sound_skill_Fail = ""
var sound_skill_Save = ""
