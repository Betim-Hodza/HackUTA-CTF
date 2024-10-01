import React from 'react';
import { useParams } from 'react-router-dom';
import SyringeChallenge from '../components/challenges/SyringeChallenge';
import SwapChallenge from '../components/challenges/SwapChallenge';
import FileManagerChallenge from '../components/challenges/FileManagerChallenge';
import StegChallenge from '../components/challenges/StegChallenge';
import HiddenBit from '../components/challenges/HiddenBit';
import CryptoChallenge from '../components/challenges/CryptoChallenge';
import WelcomeChallenge from '../components/challenges/WelcomeChallenge';
import WebExploitationChallenge from '../components/challenges/WebExploitationChallenge';
import CommandInjectionChallenge from '../components/challenges/CommandInjectionChallenge';
import ThePasswordIsPasswordChallenge from '../components/challenges/ThePasswordIsPasswordChallenge';
import WheresMyFriend from '../components/challenges/WheresMyFriend';
import AirportCriminal from '../components/challenges/AirportCriminal';
import RSAschoolKeys from '../components/challenges/RSAschoolKeys';
import RSAoffice from '../components/challenges/RSAoffice';
import HexProtect from '../components/challenges/HexProtect';

// Challenge lookup object
const challenges = {
  'sql': { '1': SyringeChallenge },
  'reverse-engineering': { '1': SwapChallenge },
  'binary-exploitation': { '1': FileManagerChallenge },
  'steganography': { '1': StegChallenge, '2': HiddenBit },
  'crypto': { '1': CryptoChallenge, '2': HexProtect, '3': RSAoffice, '4': RSAschoolKeys },
  'general-skills': { '1': WelcomeChallenge },
  'web-exploitation': { '1': WebExploitationChallenge },
  'command-injection': { '1': CommandInjectionChallenge },
  'forensics': { '1': ThePasswordIsPasswordChallenge },
  'osint': { '1': WheresMyFriend, '2': AirportCriminal },
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
