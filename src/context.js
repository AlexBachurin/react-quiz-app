import React, { useState, useContext } from "react";
import axios from 'axios'

let url = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
const AppContext = React.createContext();

//table for categories because we have not strings as categories but numbers
const categoryTable = {
    sports: 21,
    history: 23,
    politics: 24,
}

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
    //state for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    //state for quiz setup
    const [quiz, setQuiz] = useState({ amount: 10, category: 'sports', difficulty: 'easy' })

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
                setWaiting(true)
                setLoading(false)
            }
        } else {
            //if we get error in response to not ruin our app show setupForm screen
            setWaiting(true)
        }
    }
    // *** NEXT QUESTION ***
    const nextQuestion = () => {
        setIndex(oldIndex => {
            //check if we are not out of bounds of questions length
            let index = oldIndex + 1;
            if (index > questions.length - 1) {
                //if we reached end of questions show modal with results
                //and index of current question
                openModal();
                setIndex(0);
            }
            return index;
        })
    }

    // *** CHECK CORRECT ANSWER ***
    //here we will accept value which will be either true or false by comparing user click with current correct answer
    const checkAnswer = (value) => {
        //if correct
        if (value) {
            setCorrect(oldValue => {
                return oldValue + 1;
            })
        }
        //and anyway we wanna go to the next question
        nextQuestion();
    }

    /// *** MODAL ***
    const openModal = () => {
        setIsModalOpen(true)

    }
    const closeModal = () => {
        //close modal and return to setupForm state
        setIsModalOpen(false);
        setWaiting(true);
        //reset correct answers here after we showed modal with results 
        setCorrect(0);
    }

    // *** FORM ***
    const handleSubmit = (e) => {
        e.preventDefault();
        // here we construct url based on what we choose in form setup
        url = `https://opentdb.com/api.php?amount=${quiz.amount}&category=${categoryTable[quiz.category]}&difficulty=${quiz.difficulty}`
        fetchQuestions(url)
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, value)
        setQuiz(quiz => {
            return { ...quiz, [name]: value }
        })
    }

    // useEffect(() => {
    //     fetchQuestions(url);

    // }, [])




    return <AppContext.Provider value={
        {
            waiting,
            loading,
            questions,
            index,
            correct,
            error,
            nextQuestion,
            checkAnswer,
            isModalOpen,
            closeModal,
            quiz,
            handleSubmit,
            handleChange
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