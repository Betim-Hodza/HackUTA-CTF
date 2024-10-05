import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';

const PlaygroundPage = () => {
    const categories = [
        { title: 'Welcome', category: 'General Skills', difficulty: 'Easy', description: 'Challenges that test basic cybersecurity skills.', path: '/challenge/general-skills/1' },
        { title: 'RSAhackuta', category: 'Cryptography', difficulty: 'Hard', description: 'Three suspicious numbers from the office.', path: '/challenge/crypto/1' },
        { title: 'Where is my friend?', category: 'OSINT', difficulty: 'Easy', description: 'Can you help find my friend?', path: '/challenge/osint/1' },
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
