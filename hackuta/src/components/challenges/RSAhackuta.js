import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const RSAhackuta = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, completed, markAsCompleted } = useCTFQuestion('RSAhackuta');

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

    const codeSnippet = `
    N = 2257

    E = 7

    C = 353 1729 2146 436 944 353 1729 2146 436 944 1039 1729 2224 1729 1177 944 1091 1039 1729 944 576 1328 2123 1155 802 944 1039 2123 1915 710 2029 1091 2123 1526 1039 1211 330 1133 1949 2029 1949 1039 1133 1211 2224 1469 1949 48 576 1949 1915 110 1133 1915 433 1577


`;

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">RSAhackuta </h1>
            <p className="mb-4">
                We found these odd numbers scribbled in one of the rooms in the ERB,
                <br></br>
                I found N and E scribbled on sticky notes, can you decode this?
            </p>
            <pre className="bg-black bg-opacity-70 p-4 rounded-lg mb-6 text-green-400 whitespace-pre-wrap break-words drop-shadow-md">
                {codeSnippet}
            </pre>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Hidden Logic Result: <input type="text" className="border rounded p-2 w-full bg-black" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter decoded result" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default RSAhackuta;
