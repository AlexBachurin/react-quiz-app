import React from 'react'
import { useGlobalContext } from '../context';
const SetupForm = () => {
    const { quiz, handleSubmit, handleChange, error } = useGlobalContext();
    return (
        <section className='quiz quiz-small'>
            <form className='setup-form'>
                <h2>setup quiz</h2>
                <div className="form-control">
                    <label htmlFor="amount">number of questions</label>
                    <input
                        type="number"
                        name='amount'
                        id='amount'
                        className='form-input'
                        min={1}
                        max={50}
                        value={quiz.amount}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="category">category</label>
                    <select onChange={handleChange} className='form-input' name="category" id="category" value={quiz.category}>
                        <option value="sports">sports</option>
                        <option value="politics">politics</option>
                        <option value="history">history</option>
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="difficulty">select difficulty</label>
                    <select onChange={handleChange} className='form-input' name="difficulty" id="difficulty" value={quiz.difficulty}>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                </div>
                {error ? <p className="error">Cannot generate questions, please try different options</p> : null}
                <button onClick={handleSubmit} type='submit' className='submit-btn'>Start</button>
            </form>
        </section>
    )
}

export default SetupForm
