const generateIdsToFetch = (max, amount, correct) => {
    let theCorrect = correct
    if(!correct && correct !== 0){
        theCorrect = max + 1
    }
    let idsToFetch = []
    while (idsToFetch.length !== amount){
        let newId = Math.floor(Math.random() * (max - 0 + 1) + 0)
        if(newId !== theCorrect && !(idsToFetch.includes(newId))){
            idsToFetch.push(newId)
        }
    }
    return idsToFetch
}

console.log(generateIdsToFetch(500, 1))