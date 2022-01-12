import React, { useState, useContext } from "react";


let url = '';
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







    return <AppContext.Provider value={
        {
            waiting,
            loading,
            questions,
            index,
            correct
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