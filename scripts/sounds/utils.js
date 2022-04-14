var femaleChars = []

function isMasculineChar(alias){
    return true
}

function playSound(id){    
    fetch('https://syrinscape.com/online/frontend-api/elements/${id}/play/?auth_token=${authToken}', { mode: 'no-cors'})
}