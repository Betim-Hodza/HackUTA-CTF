import React, { useState } from 'react';
import { auth, db, serverTimestamp } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username: username,
        createdAt: serverTimestamp(),
        score: 0,
        completedQuestions: []
      });

      // Redirect to home page or dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen bg-blue-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full p-3 mb-4 border rounded text-gray-900"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 mb-4 border rounded text-gray-900"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 mb-4 border rounded text-gray-900"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
