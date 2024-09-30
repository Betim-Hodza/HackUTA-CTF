import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const FileManagerChallenge = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question,completed, markAsCompleted } = useCTFQuestion('FileManagerChallenge');

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

    const downloadBinary = () => {
        const element = document.createElement("a");
        element.href = "/file_manager.exe"; // Path to the binary file in the public directory
        element.download = "file_manager.exe";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">File Manager: Binary Exploitation Challenge</h1>
            <p className="mb-4">
                In this challenge, you need to find vulnerabilities in the provided binary application. Analyze the binary file to understand its behavior and find an exploit to gain control.
            </p>
            <button onClick={downloadBinary} className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 mb-4">
                Download Binary
            </button>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                    Exploit Result: <input type="text" className="border rounded p-2 w-full" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter result of your exploit" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default FileManagerChallenge;
