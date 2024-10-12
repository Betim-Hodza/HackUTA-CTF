import React, { useState } from 'react';
import ChallengeCard from '../components/ChallengeCard';

const PlaygroundPage = () => {
    const categories = [
        { title: 'Welcome', category: 'General Skills', difficulty: 'Easy', description: 'Challenges that test basic cybersecurity skills.', path: '/challenge/general-skills/1' },
        { title: 'Airplane Friend', category: 'OSINT', difficulty: 'Medium', description: 'My friend is testing my skills again...', path: '/challenge/osint/1' },
        { title: 'Trynfindme', category: 'OSINT', difficulty: 'Hard', description: 'theres a contest to find out whats the name of that highlighted building...', path: '/challenge/osint/2' },
        { title: 'Hackercats', category: 'Forensics', difficulty: 'Medium', description: 'There seems to be more to this image than meets the eye...', path: '/challenge/forensics/1' },
        { title: 'ConvolutedTextHunt', category: 'Forensics', difficulty: 'Medium', description: 'A long, convoluted text file hides a valuable flag...', path: '/challenge/forensics/2' },
        { title: 'Encrypception', category: 'Steganography', difficulty: 'Medium', description: 'Theres this really really long message, and it looks weird...', path: '/challenge/steganography/1' },
        { title: 'RSAhackuta', category: 'Cryptography', difficulty: 'Hard', description: 'We found these odd numbers scribbled in one of the rooms in the ERB...', path: '/challenge/crypto/1' },
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
