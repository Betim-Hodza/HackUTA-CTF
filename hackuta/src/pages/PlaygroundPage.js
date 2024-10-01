import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';

const PlaygroundPage = () => {
    const categories = [
        { title: 'Welcome', category: 'General Skills', difficulty: 'Easy', description: 'Challenges that test basic cybersecurity skills.', path: '/challenge/general-skills/1' },
        { title: 'Swap', category: 'Reverse Engineering', difficulty: 'Medium', description: 'Decode and understand the underlying code.', path: '/challenge/reverse-engineering/1' },
        { title: 'File Manager', category: 'Binary Exploitation', difficulty: 'Hard', description: 'Find vulnerabilities in binary applications.', path: '/challenge/binary-exploitation/1' },
        { title: 'Where\'s Waldo?', category: 'Steganography', difficulty: 'Easy', description: 'Analyze digital evidence to solve the challenge.', path: '/challenge/steganography/1' },
        { title: 'Hidden Bit', category: 'Steganography', difficulty: 'Medium', description: 'Find out what\'s going on with the attached file.', path: '/challenge/steganography/2' },
        { title: 'Interwebs', category: 'Web Exploitation', difficulty: 'Medium', description: 'Identify and exploit vulnerabilities in web applications.', path: '/challenge/web-exploitation/1' },
        { title: 'You\'ve been hacked!', category: 'Command Injection', difficulty: 'Hard', description: 'Exploit systems via command injection vulnerabilities.', path: '/challenge/command-injection/1' },
        { title: 'Spot the Difference!', category: 'Forensics', difficulty: 'Easy', description: 'Find hidden information within files.', path: '/challenge/forensics/1' },
        { title: 'Scrambled Eggs', category: 'Cryptography', difficulty: 'Medium', description: 'Test your cryptography skills.', path: '/challenge/crypto/1' },
        { title: 'Hex Protect', category: 'Cryptography', difficulty: 'Hard', description: 'Multiple crypto algorithms for extra security?', path: '/challenge/crypto/2' },
        { title: 'RSA Office keys', category: 'Cryptography', difficulty: 'Hard', description: 'Three suspicious numbers from the office.', path: '/challenge/crypto/3' },
        { title: 'RSA School keys', category: 'Cryptography', difficulty: 'Medium', description: 'Strange numbers found in the school library.', path: '/challenge/crypto/4' },
        { title: 'Syringe', category: 'SQL Injection', difficulty: 'Easy', description: 'Learn about SQL vulnerabilities.', path: '/challenge/sql/1' },
        { title: 'Where is my friend?', category: 'OSINT', difficulty: 'Easy', description: 'Can you help find my friend?', path: '/challenge/osint/1' },
        { title: 'Airport-Criminal', category: 'OSINT', difficulty: 'Medium', description: 'The police found a leaked photo of the man on the run.', path: '/challenge/osint/2' },
    ];

    // State for search and filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filtered and searched challenges
    const filteredCategories = categories.filter((challenge) => {
        const matchesCategory = selectedCategory === 'All' || challenge.category === selectedCategory;
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Unique categories for filtering
    const uniqueCategories = ['All', ...new Set(categories.map((category) => category.category))];

    return (
        <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-black min-h-screen p-10 text-white">
            <h2 className="text-5xl font-bold mb-12 text-center drop-shadow-lg">Hack Away!</h2>

            {/* Search and Filter Controls */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <input
                    type="text"
                    placeholder="Search challenges..."
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {uniqueCategories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            {/* Challenge Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((category, index) => (
                    <ChallengeCard key={index} category={category} />
                ))}
            </div>
        </div>
    );
};

export default PlaygroundPage;
