import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const PasswordInput = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, completed, markAsCompleted } = useCTFQuestion('PasswordInput');

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
            <h1 className="text-2xl font-bold mb-4">PasswordInput</h1>
            <p className="mb-4">
            You've been given an executable that asks for a password to reveal the hidden flag.
            <br></br>
            However, the password is a closely guarded secret, and only the right combination will unlock it. 
            <br></br>
            Can you reverse engineer the program and figure out the correct password to retrieve the flag?
            <br></br>
            <br></br>

            You’ll need to analyze how the program processes input and determine the exact password to succeed. Some hints might be provided for incorrect guesses, but only one password will give you the flag.
            <br></br>
            Note for macOS/Linux users: The executable is for Windows, so you may need to use a workaround like a virtual machine or Wine to run the program.

            </p>
            <a href="/ReverseMeow.exe" download className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 mb-4 inline-block">
                Download File
            </a>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Hidden Logic Result: <input type="text" className="border rounded p-2 w-full bg-black" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter decoded result" />
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

export default PasswordInput;
