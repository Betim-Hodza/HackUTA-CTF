import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const HexProtect = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, completed, markAsCompleted } = useCTFQuestion('HexProtect');

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

    const codeSnippet = `00110101 00111001 00100000 00110011 00110011 00100000 00110100 01100101 00100000 00110110 01100011 00100000 00110101 00111001 00100000 00110011 00110001 00100000 00110011 00111001 00100000 00110110 01100001 00100000 00110110 00110100 00100000 00110100 00110111 00100000 00110101 01100001 00100000 00110011 00110111 00100000 00110110 00110001 00100000 00110100 00110100 00100000 00110101 00110010 00100000 00110110 01100001 00100000 00110110 00110001 00100000 00110111 01100001 00100000 00110100 01100101 00100000 00110111 00111001 00100000 00110101 00111000 00100000 00110011 00110010 00100000 00110100 01100101 00100000 00110100 00110001 00100000 00110110 00110100 00100000 00110100 00111000 00100000 00110011 00110000 00100000 00110011 01100100
`;

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Hex Protect</h1>
            <p className="mb-4">
                Uh oh, looks like my friend thought using multiple crypto algorithms meant he'd be safer! 
                <br></br>
                Show him it's quality over quantity!
            </p>
            <pre className="bg-gray-100 p-3 rounded mb-4 break-words whitespace-pre-wrap">
                {codeSnippet}
            </pre>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Hidden Logic Result: <input type="text" className="border rounded p-2 w-full" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter decoded result" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default HexProtect;
