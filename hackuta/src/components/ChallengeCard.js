import React from 'react';
import { Link } from 'react-router-dom';

const ChallengeCard = ({ category }) => {
    return (
        <Link to={category.path} className="block p-6 bg-white rounded shadow hover:bg-blue-50">
            <h3 className="text-xl font-semibold">{category.title}</h3>
            <p className="mt-2 text-gray-600">{category.description}</p>
        </Link>
    );
};

export default ChallengeCard;
