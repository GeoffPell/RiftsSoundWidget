import { packageId } from "./constants.js";

export function msgContains(msg, possibles){
    if (msg == null){
        return false
    }

    if (possibles.some(function(v) { return msg.indexOf(v) >= 0; })) {
        return true;
    }
    return false
}


function isMasculineChar(alias){
    return true
}

export function playSound(id, delay = 0){    
    if (delay > 0){
        //await sleep(delay);
    }
    var authToken = game.settings.get(packageId, "Syrinscape-Token");
    // console.log('https://syrinscape.com/online/frontend-api/elements/'+id+'/play/?auth_token='+authToken)
    fetch('https://syrinscape.com/online/frontend-api/elements/'+id+'/play/?auth_token='+authToken, { mode: 'no-cors'})
}

function sleep(ms) {
//return new Promise(resolve => setTimeout(resolve, ms));
}


export function isObjectEmpty(obj){
    if (obj == null){
        return true;
    }

    if (Object.keys(obj).length != 0){
        return false;
    }
    
    return true;
}