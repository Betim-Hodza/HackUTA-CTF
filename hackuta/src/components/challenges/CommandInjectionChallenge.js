import React, { useState } from 'react';
import useCTFQuestion from '../../hooks/useCTFQuestion';

const CommandInjectionChallenge = () => {
    const [output, setOutput] = useState([]);
    const [command, setCommand] = useState('');
    const [flagInput, setFlagInput] = useState('');
    const [flagVerified, setFlagVerified] = useState(false);
    const { key, completed, markAsCompleted } = useCTFQuestion('CommandInjectionChallenge');

    const handleCommand = (e) => {
        e.preventDefault();

        const commandLower = command.toLowerCase();
        let response = '';

        // Directory contents
        const visibleFiles = `.\n..\nreadme.txt\n`;
        const hiddenFiles = `.hidden_folder\n`;  // Only show the hidden folder, not the file inside it

        // Command simulation logic
        if (commandLower === 'ls') {
            response = visibleFiles; // Only show visible files
        } else if (commandLower === 'ls -a' || commandLower === 'ls -al' || commandLower === 'ls -la' || commandLower === 'ls -lah') {
            response = visibleFiles + hiddenFiles; // Show visible files + hidden folder
        } else if (commandLower.startsWith('cat')) {
            const args = commandLower.split(' ');

            if (args[1] === 'readme.txt') {
                response = `Welcome to the challenge! Can you find the hidden secret.py?\n`;
            } else if (args[1] === '.hidden_folder/secret.py') {
                response = `print("You've found the secret!")\n`;           
                response += `\nCongratulations! You've exploited the vulnerability!\n`;
                response += `\nYour key is: ${key.answer}\n`;
            } else {
                response = `cat: ${args[1]}: No such file or directory\n`;
            }
        } else if (commandLower.includes(';')) {
            // Simulate command injection
            if (commandLower.includes('cat .hidden_folder/secret.py')) {
                response = `print("You've found the secret!")\n`;
                response += `\nCongratulations! You've exploited the vulnerability!\n`;
                response += `\nYour key is: ${key.answer}\n`;
            } else {
                response = `Command injection detected but nothing happened.\n`;
            }
        } else {
            response = `Command not recognized: ${command}\n`;
        }

        setOutput([...output, `> ${command}`, response]);
        setCommand('');
    };

    const handleFlagVerification = async () => {
        if (!key) {
            setOutput('Error: Question data is not available. Please try again later.');
            return;
        }

        if (completed) {
            setOutput('You have already completed this question.');
            return;
        }

        if (flagInput === key.answer) {
            await markAsCompleted();
            setFlagVerified(true);
        } else {
            setFlagVerified(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">You've been hacked!: Command Injection Challenge</h1>
            <p className="mb-4">
                In this challenge, you need to exploit a command injection vulnerability. Use the terminal below to execute commands.
            </p>

            <div className="bg-black text-green-500 font-mono p-4 rounded mb-4" style={{ minHeight: '200px', maxHeight: '300px', overflowY: 'auto' }}>
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>

            <form onSubmit={handleCommand} className="flex mb-4">
                <span className="text-green-500 mr-2">{'>'}</span>
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className="flex-grow border rounded p-2"
                    placeholder="Enter command here (e.g., ls, cat readme.txt, ls -a)"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 ml-2 rounded">Run</button>
            </form>

            <div className="mb-4">
                Your Answer:
                <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    className="border rounded p-2 w-full"
                    placeholder="Enter your answer here"
                />
                <button onClick={handleFlagVerification} className="bg-blue-500 text-white p-2 mt-2 rounded w-full">
                    Submit
                </button>
            </div>

            {flagVerified && (
                <div className="bg-green-500 text-white p-2 rounded">
                    Congratulations! You've entered the correct flag!
                </div>
            )}
        </div>
    );
};

export default CommandInjectionChallenge;
