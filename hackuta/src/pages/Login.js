import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/playground');
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-lg">Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-black bg-opacity-70 p-6 rounded-lg shadow-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 mb-4 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400"
        />
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <Link 
            to="/signup" 
            className="w-full px-6 py-3 bg-purple-600 text-white font-semibold rounded text-center hover:bg-purple-700 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
