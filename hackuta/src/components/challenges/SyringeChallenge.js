import React, { useState } from 'react';

const SyringeChallenge = () => {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulate a basic SQL injection check
        if (input.toLowerCase().includes("' or '1'='1")) {
            setMessage('Success! You found a common SQL injection vulnerability.');
        } else {
            setMessage('Try again. Your input did not exploit the SQL vulnerability.');
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Syringe: SQL Injection Challenge</h1>
            <p className="mb-4">
                In this challenge, you'll learn about a common SQL vulnerability. Your task is to find a way to log in without knowing the username and password by using SQL injection.
            </p>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2">
                        Username: <input type="text" className="border rounded p-2 w-full" placeholder="user" readOnly />
                    </label>
                <label className="block mb-2">
                    Password: <input type="text" className="border rounded p-2 w-full" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter password" />
                </label>
                <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-2 hover:bg-blue-600">
                    Submit
                </button>
            </form>
            <p className="mt-4 text-red-500">{message}</p>
        </div>
    );
};

export default SyringeChallenge;
