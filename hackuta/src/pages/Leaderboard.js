import React from 'react';
import useUserScores from '../hooks/useUserScores';

const Leaderboard = () => {
  const { scores, loading, error } = useUserScores(10); // Fetch top 10 scores

  if (loading) return <div className="text-white text-center mt-8">Loading leaderboard...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black justify-center overflow-hidden">
      <div className="container mx-auto p-8 mt-16 bg-gradient-to-br from-purple-600 to-blue-900 opacity-90 rounded-lg shadow-2xl text-white">
      <h2 className="text-4xl font-bold mb-6 text-center drop-shadow-lg font-ps1">🏆 Leaderboard</h2>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-purple-700">
            <th className="p-3 text-left font-semibold border-b border-gray-600 font-ps1 text-xl">Rank</th>
            <th className="p-3 text-left font-semibold border-b border-gray-600 font-ps1 text-xl">Username</th>
            <th className="p-3 text-left font-semibold border-b border-gray-600 font-ps1 text-xl">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id} className={`hover:bg-purple-800 transition duration-300 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`}>
              <td className="p-3 text-center border-b border-gray-700 font-ps1">{index + 1}</td>
              <td className="p-3 border-b border-gray-700 font-ps1">{score.username}</td>
              <td className="p-3 text-center border-b border-gray-700 font-ps1">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    
  );
};

export default Leaderboard;
