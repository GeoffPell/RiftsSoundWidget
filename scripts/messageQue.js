
//push id with attck roll
//push id with damage roll
// has id with attack roll
// has id with damage roll

var que = []

function trim(){
    if (que.length > 4){
        que.unshift()
    }
}

export function quePushIdWithDmg(id){
    que.push({id: id, state:"dmg"})
    trim()
}

export function quePushIdWithAtk(id){
    que.push({id: id, state:"atk"})
    trim()
}

export function queHasIdWithDmg(id){
    var ret = que.some(item => (item.id == id && item.state == "dmg"));
    return ret
}

export function queHasIdWithAtk(id){
    var ret = que.some(item => (item.id == id && item.state == "atk"));
    return ret
}