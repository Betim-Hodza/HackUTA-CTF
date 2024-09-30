import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const ForensicsChallenge = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, loading, error, completed, markAsCompleted } = useCTFQuestion('Challenge');

    const handleSubmit = async (e) => {
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

    const downloadEvidence = () => {
        const element = document.createElement("a");
        element.href = "/evidence.png"; // Path to the evidence file in the public directory
        element.download = "evidence.png";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Where's Waldo?: Forensics Challenge</h1>
            <p className="mb-4">
                In this challenge, you need to analyze the provided evidence file to uncover hidden information. Download the evidence file and use steganography tools to find the clues.
            </p>
            <button onClick={downloadEvidence} className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 mb-4">
                Download Evidence
            </button>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    What did you find?: <input type="text" className="border rounded p-2 w-full" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your findings here" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default StegChallenge;
