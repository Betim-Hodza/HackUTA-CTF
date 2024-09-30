import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlaygroundPage from './pages/PlaygroundPage';
import ChallengePage from './pages/ChallengePage';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { auth } from "./firebaseconfig";
import { onAuthStateChanged } from 'firebase/auth';

// Wrapper component to conditionally show the Navbar
function Layout({ user }) {
    const location = useLocation(); // Get current route

    return (
        <div className="flex flex-col min-h-screen">
            {/* Conditionally render Navbar if not on home page */}
            {location.pathname !== '/' && <Navbar user={user} />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route 
                        path="/playground" 
                        element={user ? <PlaygroundPage /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/challenge/:category/:id" 
                        element={user ? <ChallengePage /> : <Navigate to="/login" />} 
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                </Routes>
            </main>
            {/* Conditionally render Footer if not on home page */}
            {location.pathname !== '/' && <Footer />}   
        </div>
    );
}

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Layout user={user} />
        </Router>
    );
}

export default App;
