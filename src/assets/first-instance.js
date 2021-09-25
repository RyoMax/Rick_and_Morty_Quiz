import {characterApi, state, dispatch} from "../App.js"


export const generateIdsToFetch = (max, amount, correct) => {
    let theCorrect = correct
    if (!correct && correct !== 0) {
        theCorrect = max + 1
    }
    let idsToFetch = []
    while (idsToFetch.length !== amount) {
        let newId = Math.floor(Math.random() * (max - 0 + 1) + 0)
        if (newId !== theCorrect && !(idsToFetch.includes(newId))) {
            idsToFetch.push(newId)
        }
    }
    return idsToFetch
}

export const randomizeOptions = options => options.sort(() => Math.random() - 0.5)

export const fetchFirstInstanceQuestions = questionCount => {
    //characters per page: 20; pages: 34
    //formula to get page: Math.floor(optId/19)
    //formula to get the id: optID % 20
    let allOptions = []
    for (let i = 0; i < questionCount; i++) {
        let correctId = generateIdsToFetch(state.characterIds, 1)[0]
        let optionsId = generateIdsToFetch(state.characterIds, 3, correctId)
        let optionsObj = []
        let correct = []
        optionsId.push(correctId)
        optionsId = randomizeOptions(optionsId)
        optionsId.forEach((opt, j) => {
            // let page = Math.floor(opt/19)
            // let id = opt % 20
            let id = opt + 1
            fetch(`${characterApi}/${id}`)
                .then(res => res.json())
                .then(data => {
                    optionsObj.push(data)
                    if (data.id === (correctId + 1)) {
                        console.log("MATCH!!!")
                        correct.push(data)
                    }
                    if (i == questionCount - 1 && j == optionsId.length - 1) {
                        console.log("last one")
                        dispatch({ type: "firstInstanceQuestionsFetched", value: true })
                    }
                })
        })
        console.log(correct.length)
        allOptions.push({ correct: correct, options: optionsObj })
    }

    return allOptions
}