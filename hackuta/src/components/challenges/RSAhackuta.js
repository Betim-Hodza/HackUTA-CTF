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
    N = 2581

    E = 3

    C = 1948 482 2282 2347 1796 1948 482 2282 2347 1796 2129 482 50 482 666 1796 1972 2129 482 1796 417 184 1580 964 1537 1796 1584 1039 1367 1172 2428 1655 1039 2547 2129 1463 1516 1020 483 1393 483 2129 1020 1463 50 1153 483 2190 417 483 2424 198 1020 2424 2271 1889


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
