import React, { useState, useContext, useEffect } from "react";
import axios from 'axios'

let url = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
const AppContext = React.createContext();



const AppProvider = ({ children }) => {
    //state for waiting before we complete and submit quiz form
    const [waiting, setWaiting] = useState(true);
    //state for loading, when we fetch questions
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState([]);
    //index of question
    const [index, setIndex] = useState(0);
    //correct answers
    const [correct, setCorrect] = useState(0)
    //state for error if we fetched incorect amount
    const [error, setError] = useState(false)

    const fetchQuestions = async (url) => {
        //show loading and disable setupForm state
        setWaiting(false);
        setLoading(true)
        const response = await axios.get(url);
        console.log(response)
        if (response) {
            //check if we have not an empty array in response if so show error
            if (response.data.results.length > 0) {
                setQuestions(response.data.results);
                setLoading(false);
            } else {
                setError(true)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        fetchQuestions(url);

    }, [])




    return <AppContext.Provider value={
        {
            waiting,
            loading,
            questions,
            index,
            correct,
            error
        }
    }>
        {children}
    </AppContext.Provider>
}

//custom hook

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider };