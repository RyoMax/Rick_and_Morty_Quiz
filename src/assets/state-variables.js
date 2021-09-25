import React, {useReducer} from "react"

export const initialState = {
    characterIds: 0,
    characterPages: 0,
    statInitializer: true,
    firstInstanceQuestions: [],
    firstInstanceQuestionsFetched: false
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "setCharacterIds":
            return { ...state, characterIds: action.value }
        case "setCharacterPages":
            return { ...state, characterPages: action.value }
        case "resetStatInitializer":
            return { ...state, statInitializer: false }
        case "setFirstInstanceQuestions":
            return { ...state, firstInstanceQuestions: action.value }
        case "fixQuestions":
            let newQuestions = action.value.map(question => {
                return { correct: question.correct[0], options: question.options }
            })
            return { ...state, firstInstanceQuestions: newQuestions }
        case "firstInstanceQuestionsFetched":
            return { ...state, firstInstanceQuestionsFetched: action.value }
        default:
            break;
    }
}

