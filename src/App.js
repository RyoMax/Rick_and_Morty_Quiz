import React, { useEffect, useReducer } from "react";
import Header from "./views/Header.js"
import jsonDescr from "./assets/episode-descr.js"
import TheGame from "./views/TheGame"
import "./styles.css"

const initialState = {
    characterIds: 0,
    episodeIds: 0,
    statInitializer: true,
    firstInstanceQuestions: [],
    secondInstanceQuestions: [],
    thirdInstanceQuestions: [],
    pageReady: false
};


const reducer = (state, action) => {
    switch (action.type) {
        case "setCharacterIds":
            return { ...state, characterIds: action.value }
        case "setEpisodeIds":
            return { ...state, episodeIds: action.value }
        case "resetStatInitializer":
            return { ...state, statInitializer: false }
        case "setFirstInstanceQuestions":
            return { ...state, firstInstanceQuestions: action.value }
        case "setSecondInstanceQuestions":
            return { ...state, secondInstanceQuestions: action.value }
        case "setThirdInstanceQuestions":
            return { ...state, thirdInstanceQuestions: action.value }
        case "setPageReady":
            return { ...state, pageReady: true }
        default:
            break;
    }
}

let episodeDescr = JSON.parse(jsonDescr)



const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState)



    const characterApi = "https://rickandmortyapi.com/api/character"
    const episodeApi = "https://rickandmortyapi.com/api/episode"

    // generate random ids, which will be need to fetch objects, 'correct' is optional, to ensure that id does not get generated again
    // params: amount of available characters; how many ids to return, [optional] id that should not be returned
    const generateIdsToFetch = (max, amount, correct) => {
        let theCorrect = correct
        if (!correct && correct !== 0) {
            theCorrect = max + 1
        }
        let idsToFetch = []
        while (idsToFetch.length !== amount) {
            let newId = Math.floor(Math.random() * (max - 1 + 1) + 1)
            if (newId !== theCorrect && !(idsToFetch.includes(newId))) {
                idsToFetch.push(newId)
            }
        }
        return idsToFetch
    }

    const randomizeOptions = options => options.sort(() => Math.random() - 0.5)


    //? pattern for the character question: [{correct: [correctObj], options: [[optionObj], [optionObj], [optionObj], [correctObj]]}, [...] ]
    const fetchCharacterQuestions = (questionCount, optionCount) => {
        let allOptions = []
        let correctIds = []
        while (allOptions.length < questionCount) {
            let correctId = generateIdsToFetch(state.characterIds, 1)[0]
            if (!(correctIds[correctIds.length - 1]) || !(correctIds.includes(correctId))) {
                correctIds.push(correctId)
                let optionsId = generateIdsToFetch(state.characterIds + 1, optionCount - 1, correctId)
                let questionObj = { options: [] }
                optionsId.push(correctId)
                optionsId = randomizeOptions(optionsId)
                optionsId.forEach(opt => {
                    let id = opt + 1
                    fetch(`${characterApi}/${id}`)
                        .then(res => res.json())
                        .then(data => {
                            questionObj.options.push(data)
                            if (data.id === (correctId + 1)) {
                                questionObj.correct = data
                            }
                        })
                })
                allOptions.push(questionObj)
            }
        }

        return allOptions
    }

    //? pattern for the episode question: [{episode: [episodeObj], options: [[optionObj], [optionObj], [optionObj], [correctObj]]}, [...] ]
    const fetchEpisodeQuestions = (questionCount, optionCount) => {
        let allOptions = []
        let correctIds = []
        while (allOptions.length < questionCount) {
            let correctId = generateIdsToFetch(state.episodeIds + 1, 1)[0]
            if (!(correctIds[correctIds.length - 1]) || !(correctIds.includes(correctId))) {
                correctIds.push(correctId)
                let questionObj = { options: [] }
                fetch(`${episodeApi}/${correctId}`)
                    .then(res => res.json())
                    .then(data => {
                        questionObj.episode = data
                        questionObj.episode.descr = episodeDescr[correctId - 1]
                        let allCharacter = data.characters
                        let allCharacterIds = allCharacter.map(char => {
                            let splitedChar = char.split("/")
                            let id = splitedChar[splitedChar.length - 1]
                            return parseFloat(id)
                        })
                        let allCharacterIdsSliced = randomizeOptions(allCharacterIds).slice(- optionCount + 1)
                        while (allCharacterIdsSliced.length < optionCount) {
                            let wrongChar = generateIdsToFetch(state.episodeIds + 1, 1)[0]
                            if (!(allCharacterIds.includes(wrongChar))) {
                                allCharacterIdsSliced.push(wrongChar)
                            }
                        }
                        allCharacterIdsSliced = randomizeOptions(allCharacterIdsSliced)

                        allCharacterIdsSliced.forEach(charId => {
                            fetch(`${characterApi}/${charId}`)
                                .then(res => res.json())
                                .then(data => {
                                    questionObj.options.push(data)
                                })
                        })

                    })
                allOptions.push(questionObj)
            }
        }

        return allOptions
    }

    //When entering the App for the first time get the stats the app works with
    useEffect(() => {
        if (state.statInitializer) {
            fetch(characterApi)
                .then(res => res.json())
                .then(data => {
                    dispatch({ type: "setCharacterIds", value: data.info.count - 1 })
                    fetch(episodeApi)
                        .then(res => res.json())
                        .then(data => {
                            dispatch({ type: "setEpisodeIds", value: data.info.count - 1 })
                            dispatch({ type: "resetStatInitializer" })
                        })
                })
        }
    }, [])

    useEffect(() => {
        if (!(state.statInitializer)) {
            dispatch({ type: "setFirstInstanceQuestions", value: fetchCharacterQuestions(4, 4) })
            dispatch({ type: "setSecondInstanceQuestions", value: fetchCharacterQuestions(4, 6) })
            dispatch({ type: "setThirdInstanceQuestions", value: fetchEpisodeQuestions(4, 6) })
            dispatch({ type: "setPageReady" })
        }
    }, [state.statInitializer])

    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                {/* Initial Component, rendered when starting the app */}
                {/* after submitting, the next component with the first question takes the place of the Welcome component */}
                <TheGame state={state} />
            </main>
        </>
    )
}

export default App