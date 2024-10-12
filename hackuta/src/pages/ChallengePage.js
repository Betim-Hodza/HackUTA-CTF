import React from 'react';
import { useParams } from 'react-router-dom';
import RSAhackuta from '../components/challenges/RSAhackuta';
import WelcomeChallenge from '../components/challenges/WelcomeChallenge'
import AirplaneFriend from '../components/challenges/AirplaneFriend';
import Hackercat from '../components/challenges/Hackercat';
import Encrypception from '../components/challenges/Encrypception';

// Challenge lookup object
const challenges = {
  'sql': {  },
  'reverse-engineering': {  },
  'binary-exploitation': { },
  'steganography': { '1': Encrypception },
  'crypto': { '1': RSAhackuta },
  'general-skills': { '1': WelcomeChallenge },
  'web-exploitation': { },
  'command-injection': {  },
  'forensics': { '1': Hackercat},
  'osint': { '1': AirplaneFriend },
};

const ChallengePage = () => {
  const { category, id } = useParams();

  // Get the challenge component based on the category and id
  const ChallengeComponent = challenges[category]?.[id];

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white p-8">
      <div className="container mx-auto bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
          {category ? category.replace(/-/g, ' ').toUpperCase() : 'CHALLENGE'} - {id}
        </h2>
        {ChallengeComponent ? (
          <ChallengeComponent />
        ) : (
          <p className="text-center text-xl">Challenge not found.</p>
        )}
      </div>
    </div>
  );
};

export default ChallengePage;
