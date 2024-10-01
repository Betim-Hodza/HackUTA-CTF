import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeCard = ({ category }) => {
    return (
        <Link to={category.path} className="block p-6 bg-black bg-opacity-70 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-blue-400 mb-2">{category.title}</h3>
            <p className="text-gray-300 mb-2">{category.description}</p>
            <p className="text-sm text-gray-400">Category: {category.category}</p>
            <p className="text-sm text-gray-400">Difficulty: {category.difficulty}</p>
        </Link>
    );
};

export default ChallengeCard;
