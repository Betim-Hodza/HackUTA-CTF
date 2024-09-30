import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const ReverseEngineeringChallenge = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const { question, completed, markAsCompleted } = useCTFQuestion('SwapChallenge');

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

    const codeSnippet = `# reverse_challenge.py

def swap_characters(input_string):
    swaps = {
        'a': 'z',
        'b': 'y',
        'c': 'x',
        'd': 'w',
        'e': 'v'
    }
    return ''.join([swaps.get(char, char) for char in input_string])

def encode_message(input_string):
    encoding_map = {
        'e': '3',
        'a': '@',
        's': '$'
    }
    swapped_message = swap_characters(input_string)
    return ''.join([encoding_map.get(char, char) for char in swapped_message])

def hidden_function():
    return encode_message("Decode")

encoded_message = hidden_function()
print(f"The encoded message is: {encoded_message}")
`;

    const downloadCode = () => {
        const element = document.createElement("a");
        const file = new Blob([codeSnippet], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "reverse_challenge.py";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Reverse Engineering Challenge</h1>
            <p className="mb-4">
                In this challenge, you'll need to reverse-engineer the provided code to find the hidden logic and determine the correct answer.
            </p>
            <pre className="bg-gray-100 p-3 rounded mb-4 break-words whitespace-pre-wrap">
                {codeSnippet}
            </pre>
            <button onClick={downloadCode} className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600 mb-4">
                Download Code
            </button>
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

export default ReverseEngineeringChallenge;
