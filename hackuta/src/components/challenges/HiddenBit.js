import React, { useState, useEffect } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const HiddenBit = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, loading, error, completed, markAsCompleted } = useCTFQuestion('HiddenBit');

    useEffect(() => {
        console.log('Question state:', question);
        console.log('Loading state:', loading);
        console.log('Error state:', error);
    }, [question, loading, error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting answer. Question:', question);
        console.log('User input:', input);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading question: {error}</div>;
    }

    if (!question) {
        return <div>No question data available.</div>;
    }

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Hidden Bit</h1>
            <p className="mb-4">
                {question.description || "Find out what's going on with the attached file."}
            </p>
            <a href="/sus.png" download className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 mb-4 inline-block">
                Download File
            </a>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Your Answer: <input type="text" className="border rounded p-2 w-full" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your answer here" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default HiddenBit;