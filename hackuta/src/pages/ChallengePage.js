import React from 'react';
import { useParams } from 'react-router-dom';
import SyringeChallenge from '../components/challenges/SyringeChallenge'; // Import the new challenge
import SwapChallenge from '../components/challenges/SwapChallenge'; // Import the new challenge
import FileManagerChallenge from '../components/challenges/FileManagerChallenge'; // Import the new challenge
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


const ChallengePage = () => {
    const { category, id } = useParams();

    // Logic to render the correct challenge based on category and id
    const renderChallenge = () => {
        if (category === 'sql' && id === '1') {
            return <SyringeChallenge />;
        }
        if (category === 'reverse-engineering' && id === '1') {
            return <SwapChallenge />;
        }
        if (category === 'binary-exploitation' && id === '1') {
            return <FileManagerChallenge />;
        }
        if (category === 'steganography' && id === '1') {
            return <StegChallenge />;
        } 
        else if (category === 'steganography' && id === '2') {
            return <HiddenBit />;
        }
        if (category === 'crypto' && id === '1') {
            return <CryptoChallenge />;
        }
        else if (category === 'crypto' && id === '2') {
            return <HexProtect />;
        }
        else if (category === 'crypto' && id === '3') {
            return <RSAoffice />;
        }
        else if (category === 'crypto' && id === '4') {
            return <RSAschoolKeys />;
        }
        if (category === 'general-skills' && id === '1') {
            return <WelcomeChallenge />;
        }
        if (category === 'web-exploitation' && id === '1') {
            return <WebExploitationChallenge />;
        }
        if (category === 'command-injection' && id === '1') {
            return <CommandInjectionChallenge />;
        }
        if (category === 'forensics' && id === '1') {
            return <ThePasswordIsPasswordChallenge />;
        }
        if (category === 'osint' && id === '1') {
            return <WheresMyFriend />;
        }
        else if (category === 'osint' && id === '2') {
            return <AirportCriminal />;
        }
        // Add more conditional rendering for other categories and challenges as needed
        return <p>Challenge not found.</p>;
    };

    return (
        <div className="container mx-auto p-5">
            {renderChallenge()}
        </div>
    );
};

export default ChallengePage;
