import React from "react";
import SetupForm from "./components/SetupForm";
import Modal from "./components/Modal";
import Loading from "./components/Loading";
import { useGlobalContext } from './context'

function App() {
  const { loading, waiting, questions, correct, index } = useGlobalContext();
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }
  //get question by current index
  const currentQuestion = questions[index];
  console.log(currentQuestion);
  //destructure and get array of answers from data
  const { question, correct_answer, incorrect_answers } = currentQuestion;
  const answers = [...correct_answer, ...incorrect_answers];
  return (
    <main>
      <section className="quiz">
        <p className="correct-answers">correct answers {correct}/{index}</p>
        <article className="container">
          {/* use dangerouslyHtml since we get not strings in response but html */}
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((item, index) => {
              return (
                <button key={index} className="answer-btn" dangerouslySetInnerHTML={{ __html: item }} />

              )
            })}
          </div>
          <button className="next-question">next question</button>
        </article>
      </section>
    </main>
  );
}

export default App;
