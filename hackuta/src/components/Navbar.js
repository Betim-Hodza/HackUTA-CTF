import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseconfig.js'
import { signOut } from 'firebase/auth';
import useUser from '../hooks/useUser.js'; // Import the custom hook

const Navbar = () => {
  const user = useUser(); // Fetch user data using the hook
  const navigate = useNavigate(); // To navigate after logging out

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/'); // Redirect to the home page after logging out
    } catch (error) {
      console.error("Logout failed:", error);
    }
    
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 text-white shadow-lg  opacity-90">
      <div className="container mx-auto flex items-center justify-between">
        {/* Conditionally redirect to PlaygroundPage if the user is logged in */}
        <Link to={user ? "/playground" : "/"} className="text-3xl font-bold flex items-center space-x-2">
          <img src="/PlayStation_1.svg" alt="PS Logo" className="w-8 h-8" />
          <span>HackUTA CTF</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <p className="text-lg italic">Welcome, {user.username}</p>
          ) : (
            <Link to="/login" className="text-lg font-semibold hover:text-gray-300 transition duration-300">
              Log In
            </Link>
          )}
          
          <Link to="/leaderboard" className="text-lg font-semibold hover:text-gray-300 transition duration-300">
            🏆 Leaderboard
          </Link>

          {user && (
            <button 
              onClick={handleLogout} // Call the logout handler on click
              className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
