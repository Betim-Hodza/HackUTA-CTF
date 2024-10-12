import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';


const Meowers = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, completed, markAsCompleted } = useCTFQuestion('Meowers');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question) {
            setMessage('Error: Question data is not available. Please try again later.');
            return;
        }

        if (completed) {
            setMessage('You have already completed this question.');
            return;
        }

        if (input.trim().toLowerCase() === question.answer.toLowerCase()) {
            try {
                await markAsCompleted();
                setMessage(`Congratulations! You solved the challenge and earned ${question.points} points.`);
            } catch (err) {
                setMessage('Error updating progress. Please try again.');
            }
        } else {
            setMessage('Incorrect. Please try again.');
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Meowers</h1>
            <p className="mb-4">
            In this challenge, you'll need to extract a hidden message (flag) from the image provided below.

            </p>

            <img src="/meowers.png" alt="Meower" width={280} />

            <a href="/meowers.png" download className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 mb-4 inline-block">
                Download File
            </a>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Your Answer: <input type="text" className="border rounded p-2 w-full bg-black" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your answer here" />
                </label>
                <button 
                type="submit" 
                className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600"
                disabled={completed}
                >
                    {completed ? 'Completed' : 'Submit'}
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default Meowers;
