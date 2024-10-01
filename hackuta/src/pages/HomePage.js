import { Link } from 'react-router-dom';

const HomePage = () => {
    const playAudio = () => {
        const audio = new Audio('ps1.mp3');
        audio.play().catch((error) => {
            console.error('Audio playback failed:', error);
        });
    };

    return (
        <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex flex-col items-center justify-center overflow-hidden">
            {/* PS1 Logo */}
            <div
                className="w-48 h-48 mb-5 bg-no-repeat bg-contain animate-pulse"
                style={{ backgroundImage: 'url("PlayStation_1.svg")' }}
                onClick={playAudio}  // Add the onClick event here
            ></div>

            {/* PS1-inspired Text */}
            <h1 className="text-4xl text-white font-bold mb-6 drop-shadow-lg animate-pulse font-ps1">HackUTA CTF</h1>

            {/* Subheaders */}
            <p className="mt-4 text-xl text-gray-300 font-ps1">CTF Challanges to make your brain hurt!</p>
            <p className="mt-4 text-xl text-gray-300 font-ps1">Sign up or log in to save completed challenges!</p>
            
            {/* Button */}
            <div className="mt-8 font-ps1 text-xxl">
                <Link 
                    to="/login" 
                    className="block px-8 py-4 bg-blue-600 text-white font-semibold rounded-full text-center hover:bg-blue-700 hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                    Start Solving
                </Link>
            </div>
        </div>
    )
};

export default HomePage;
